import { Circle, CheckCircle, Calendar } from "lucide-react";
import { TASK_PRIORITIES } from "../../utils/constants/priorities";

export default function TaskCard(props) {
    const backgroundPriority = props.isFinished ? 'bg-gray-300' : (TASK_PRIORITIES[props.priority.id].dotColor || 'bg-gray-400');
    const textPriority = props.isFinished ? 'text-gray-400' : (TASK_PRIORITIES[props.priority.id].textColor || 'text-gray-400');

    const cardBg = props.isFinished ? 'bg-gray-100' : 'bg-white';
    const titleStyle = props.isFinished ? 'line-through text-gray-400' : 'text-gray-800';

    return (
        <li className={`p-10 rounded-xl shadow-sm ${cardBg}`}>
            <label className="flex">
                <div className="w-8 mr-2">
                    <input type="checkbox" className='peer sr-only' defaultChecked={props.isFinished} />
                    <Circle className="w-6 h-6 text-gray-400 shrink-0 peer-checked:hidden" strokeWidth={1.5} />
                    <CheckCircle className="w-6 h-6 text-slate-600 shrink-0 hidden peer-checked:block" strokeWidth={2} />
                </div>

                <div className="w-full">
                    <header className="flex justify-between">
                        <h3 className={`font-bold text-normal ${titleStyle}`}>{props.title}</h3>
                        <span className="rounded px-2 py-1">
                            {!props.isFinished && <span className={`inline-block w-2 h-2 rounded-full mr-2 ${backgroundPriority}`}></span>}
                            <span className={`uppercase tracking-widest rounded text-sm font-semibold ${textPriority}`}>{props.priority.name}</span>
                        </span>
                    </header>
                    <p className="text-slate-500">{props.description}</p>
                    <footer className="mt-4 flex items-center gap-3 text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <time className="uppercase font-bold tracking-widest text-sm">{props.dueDate}</time>
                    </footer>
                </div>
            </label>
        </li>
    );
}