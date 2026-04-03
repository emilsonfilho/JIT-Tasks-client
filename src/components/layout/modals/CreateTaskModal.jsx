import { useEffect, useState } from "react";
import Modal from "./Modal";
import ModalButton from "./ModalButton";
import PrioritySelector from "../../tasks/PrioritySelector";
import SectionTitle from "../../ui/SectionTitle";
import { CircleFadingPlus } from "lucide-react";

export default function CreateTaskModal(props) {
    const [priorities, setPriorities] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/priorities/')
            .then(response => response.json())
            .then(data => {
                setPriorities(data);
                console.log(data);
            });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: e.target.querySelector('input[placeholder="Issue Title"]').value,
                    description: e.target.querySelector('textarea').value,
                    priority_id: selectedPriority?.id,
                    due_date: e.target.querySelector('input[type="date"]').value
                })
            });

            await response.json();

            if (response.ok) {
                props.onTaskCreated();

                props.onClose();
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
                    <input type="text" placeholder="Issue Title" className="font-semibold text-2xl placeholder:text-gray-300 focus:outline-none" />
                    <textarea name="description" id="description" placeholder="Add a description" className="placeholder:text-gray-300 focus:outline-none w-full"></textarea>
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
                                    onSelect={() => setSelectedPriority(priority)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <SectionTitle>Prazo</SectionTitle>
                        <input type="date" name="due-date" id="due-date" className="w-50 focus:outline-none" />
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