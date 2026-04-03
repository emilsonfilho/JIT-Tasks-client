import { getPriorityStyle } from "../../utils/getPriorityStyle";

export default function PriorityBadge(props) {
  const { priorityDotColor, priorityTextColor } = getPriorityStyle(
    props.priority.id,
    props.isFinished,
  );
  const { priorityContainerColor } = props.showBg
    ? getPriorityStyle(props.priority.id, props.isFinished)
    : {};

  return (
    <span
      className={`${props.containerStyle} ${priorityContainerColor || ""} flex items-center`}
    >
      {props.showDot && (
        <span
          className={`inline-block w-2 h-2 rounded-full mr-2 ${priorityDotColor}`}
        ></span>
      )}
      <span className={`${props.priorityTitleStyle} ${priorityTextColor}`}>
        {props.title}
      </span>
    </span>
  );
}
