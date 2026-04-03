import PriorityBadge from "../ui/PriorityBadge";

export default function PrioritySelector(props) {
  return (
    <div>
      <input
        type="radio"
        name="priority"
        id={props.priority.id}
        className="hidden"
        checked={props.isSelected}
        onChange={props.onSelect}
      />
      <label htmlFor={props.priority.id} className="text-sm">
        <PriorityBadge
          priority={props.priority}
          isFinished={!props.isSelected}
          title={props.priority.name}
          showBg={props.isSelected}
          showDot={true}
          containerStyle={`
                        px-4 py-2 rounded-lg flex items-center transition-all 
                        ${props.isSelected ? "shadow-sm" : "bg-gray-200 opacity-60 text-gray-400"}
                    `}
          priorityTitleStyle="font-medium"
        />
      </label>
    </div>
  );
}
