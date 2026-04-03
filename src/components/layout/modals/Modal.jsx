import { X } from 'lucide-react';

export default function Modal(props) {
    if (!props.isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" id="modal">
            <div className="w-full bg-white max-w-3xl rounded-lg shadow-lg flex flex-col p-6">
                {/* Header */}
                <header className="flex items-center p-4 justify-between">
                    <div className="flex gap-2 items-center">
                        {props.icon && <props.icon size={20} className="text-slate-600" />}
                        <h2 className="text-sm font-semibold text-slate-600 tracking-widest uppercase">{props.title}</h2>
                    </div>
                        <button className="cursor-pointer" onClick={props.onClose}>
                            <X size={20} />
                        </button>
                </header>

                {/* Content */}
                <main className="p-4 text-slate-700">
                    {props.children}
                </main>
            </div>
        </div>
    )
}

