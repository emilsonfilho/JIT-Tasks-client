import { useEffect, useState } from "react";
import Modal from "./Modal";
import ModalButton from "./ModalButton";
import PrioritySelector from "../../tasks/PrioritySelector";
import SectionTitle from "../../ui/SectionTitle";
import { CircleFadingPlus } from "lucide-react";

export default function TaskModal(props) {
    const [priorities, setPriorities] = useState([]);

    const [title, setTitle] = useState(props.taskToEdit?.title || "");
    const [description, setDescription] = useState(props.taskToEdit?.description || "");
    const [dueDate, setDueDate] = useState(props.taskToEdit?.due_date ? props.taskToEdit?.due_date.split("T")[0] : "");
    const [selectedPriority, setSelectedPriority] = useState(null);

    const [priorityError, setPriorityError] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/priorities/')
            .then(response => response.json())
            .then(data => {
                setPriorities(data);
                if (props.taskToEdit) {
                    const taskPriority = data.find(priority => priority.id === props.taskToEdit.priority_id);
                    setSelectedPriority(taskPriority);
                }
            });
    }, [props.taskToEdit]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!selectedPriority) {
            setPriorityError(true);
            return;
        }

        setPriorityError(false);

        try {
            const isEditing = !!props.taskToEdit;
            const url = isEditing ? `http://localhost:3000/tasks/${props.taskToEdit.id}` : "http://localhost:3000/tasks/";
            const method = isEditing ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    priority_id: selectedPriority?.id,
                    due_date: dueDate,
                    is_finished: props.taskToEdit ? props.taskToEdit.is_finished : false
                })
            });

           if (response.ok) {
            if (props.onTaskSaved) props.onTaskSaved();
            if (props.onClose) props.onClose();
           }
        } catch (error) {
            console.log("Erro ao criar tarefa:", error);
        }
    }

    return (
        <Modal  
            isOpen={props.isOpen}
            title="Criar nova tarefa"
            icon={CircleFadingPlus}
            onClose={props.onClose}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <fieldset className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        placeholder="Issue Title" 
                        className="font-semibold text-2xl placeholder:text-gray-300 focus:outline-none" 
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                    <textarea 
                        name="description" 
                        id="description" 
                        placeholder="Add a description" 
                        className="placeholder:text-gray-300 focus:outline-none w-full"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        required
                    ></textarea>
                </fieldset>
                <hr className="text-slate-200" />
                <fieldset className="grid grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <SectionTitle>Prioridade</SectionTitle>
                        <div className="flex gap-4">
                            {priorities && priorities.map((priority) => (
                                <PrioritySelector 
                                    key={priority.id} 
                                    priority={priority} 
                                    isSelected={selectedPriority?.id === priority.id}
                                    onSelect={() => {
                                        setSelectedPriority(priority)
                                        setPriorityError(false);
                                    }}
                                />
                            ))}
                        </div>

                        {priorityError && (
                            <span className="text-red-500 text-sm font-medium mt-[-1rem]">Por favor, selecione uma prioridade.</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-6">
                        <SectionTitle>Prazo</SectionTitle>
                        <input 
                            type="date" 
                            name="due-date" 
                            id="due-date" 
                            className="w-50 focus:outline-none" 
                            onChange={e => setDueDate(e.target.value)}
                            value={dueDate}
                            required
                        />
                    </div>
                </fieldset>
                <footer className="flex justify-end">
                    <div className="flex gap-2">
                        <ModalButton style="text-slate-600 hover:bg-slate-200" onClick={props.onClose}>Cancelar</ModalButton>
                        <ModalButton style="bg-gray-500 text-white rounded-lg hover:bg-gray-600" type="submit">Salvar</ModalButton>
                    </div>
                </footer>
            </form>
        </Modal>
    )
}