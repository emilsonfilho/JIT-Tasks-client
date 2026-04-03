import {
  Circle,
  CheckCircle,
  Calendar,
  PencilLine,
  Trash2,
} from "lucide-react";
import PriorityBadge from "../ui/PriorityBadge";

export default function TaskCard(props) {
  const cardBg = props.isFinished ? "bg-gray-100" : "bg-white";
  const titleStyle = props.isFinished
    ? "line-through text-gray-400"
    : "text-gray-800";

  return (
    <li className={`p-10 rounded-xl shadow-sm ${cardBg} flex`}>
      <label className="w-8 mr-2 shrink-0 cursor-pointer relative">
        <div className="w-8 mr-2">
          <input
            type="checkbox"
            className="peer sr-only"
            defaultChecked={props.isFinished}
            onChange={props.onToggleStatus}
          />
          <Circle
            className="w-6 h-6 text-gray-400 shrink-0 peer-checked:hidden"
            strokeWidth={1.5}
          />
          <CheckCircle
            className="w-6 h-6 text-slate-600 shrink-0 hidden peer-checked:block"
            strokeWidth={2}
          />
        </div>
      </label>

      <div className="w-full">
        <header className="flex justify-between pb-4">
          <h3 className={`font-bold text-normal ${titleStyle}`}>
            {props.title}
          </h3>
          <PriorityBadge
            priority={props.priority}
            isFinished={props.isFinished}
            priorityTitleStyle="uppercase tracking-widest text-sm font-semibold"
            title={`Prioridade ${props.priority.name}`}
          />
        </header>
        <p className="text-slate-500">{props.description}</p>
        <footer className="mt-4 text-slate-500 flex justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4" />
            <time className="uppercase font-bold tracking-widest text-sm">
              {props.dueDate}
            </time>
          </div>
          <div className="flex gap-3">
            <button
              className="cursor-pointer text-slate-500 hover:text-slate-700"
              onClick={props.onEdit}
            >
              <PencilLine size={15} />
            </button>
            <button
              className="cursor-pointer text-slate-500 hover:text-slate-700"
              onClick={props.onDelete}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </footer>
      </div>
    </li>
  );
}
