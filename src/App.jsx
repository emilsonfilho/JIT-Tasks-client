import { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import TaskCard from './components/tasks/TaskCard';
import { getGreeting } from './utils/getGreeting';
import { formatDate } from './utils/formatDate';
import ColumnHeader from './components/layout/ColumnHeader';
import TaskModal from './components/layout/modals/TaskModal';

import './App.css';

function App() {
  const [overdatedAmount, setOverdatedAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [completedAmount, setCompletedAmount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  }

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  }

  const fetchAllData = () => {
    fetch('http://localhost:3000/tasks/pending')
      .then(response => response.json())
      .then(data => {
        setPendingTasks(data);
      });

    fetch('http://localhost:3000/tasks/metrics')
    .then(response => response.json())
    .then(data => {
      setOverdatedAmount(data.overdated);
      setPendingAmount(data.pending);
      setCompletedAmount(data.done);
    });
    
    fetch('http://localhost:3000/tasks/finished')
    .then(response => response.json())
    .then(data =>{
      setFinishedTasks(data);
    });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleDeleteTask = async task => {
    const confirmDelete = window.confirm("Essa é uma operação irreversível. Deseja continuar?") 
    if (confirmDelete) {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.ok) {
          fetchAllData();
        }
      }).catch(error => {
        console.error("Erro ao deletar tarefa:", error);
      });
    }
  }

  async function handleToggleTaskStatus(task) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${task.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_finished: !task.is_finished })
      });

      if (response.ok) {
        fetchAllData();
      }
    } catch (error) {
      console.error("Erro ao atualizar status de tarefa:", error);
    }
  }

  return (
    <div className="flex bg-gray-200 text-slate-800 h-screen overflow-hidden">
      <Sidebar onOpen={handleOpenCreateModal} />

      <main className='flex-1 flex flex-col p-8 overflow-hidden bg-gray-100 gap-6'>
        <div className="shrink-0 mt-8">
          <h1 className='font-semibold text-4xl'>{getGreeting()}</h1>
          <p className='mt-2'>Você tem {overdatedAmount} itens atrasados, {pendingAmount} tarefas pendentes e {completedAmount} concluída para hoje</p>
        </div>
        <div className='flex flex-1 min-h-0 gap-6'>
          <div className='flex-1 flex flex-col gap-6 min-h-0'>
            <ColumnHeader title="PENDENTES" amount={pendingTasks.length} />
            
            <div className='flex-1 overflow-y-auto pr-2 pb-4'>
              <ul className="list-none flex flex-col gap-4">
                {pendingTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    priority={task.priority}
                    description={task.description}
                    dueDate={formatDate(task.due_date)}
                    isFinished={task.is_finished}
                    onToggleStatus={() => handleToggleTaskStatus(task)}
                    onEdit={() => handleOpenEditModal(task)}
                    onDelete={() => handleDeleteTask(task)}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className='w-1/3 flex flex-col bg-slate-200 rounded-xl p-6 gap-6 min-h-0'>
            <ColumnHeader title="FINALIZADAS" amount={completedAmount} />

             <div className='flex-1 overflow-y-auto'>
              <ul className="list-none flex flex-col gap-4">
                {finishedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    priority={task.priority}
                    description={task.description}
                    dueDate={formatDate(task.due_date)}
                    isFinished={task.is_finished}
                    onToggleStatus={() => handleToggleTaskStatus(task)}
                    onEdit={() => handleOpenEditModal(task)}
                    onDelete={() => handleDeleteTask(task)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      {isModalOpen && (
        <TaskModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onTaskSaved={fetchAllData}
          taskToEdit={taskToEdit}
        />
      )}
    </div>
  )
}

export default App
