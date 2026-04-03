import { CheckCircle, Plus } from 'lucide-react';
import React from 'react';

export default function Sidebar() {
    return (
        <aside className="w-72 h-screen flex flex-col justify-between border-r border-gray-200 p-6">
        {/* <aside className="w-72 bg-gray-100 p-4"> */}
          <div>
            <div className="mb-10 mt-2">
                <h1 className='text-xl font-extrabold text-slate-900'>JIT Tasks</h1>
                <p className='uppercase tracking-widest text-sm opacity-50'>Gerenciador de Tarefas</p>
            </div>

            <nav className='flex flex-col gap-4'>
            <div className='flex items-center gap-3 text-slate-900 font-medium cursor-pointer'>
                <CheckCircle size={20} />
                <span>Minhas Tarefas</span>
            </div>
            </nav>
          </div>
          <div>
            <button className='w-full bg-slate-900 text-white flex items-center justify-center gap-3 py-3 rounded-xl font-semibold mb-8 shadow-sm hover:bg-slate-800 transition-colors cursor-pointer text-sm'>
                <Plus size={18} />
                Nova Tarefa
            </button>
          </div>
        </aside>
    )
}