import { TASK_PRIORITIES } from "./constants/priorities";

export const getPriorityStyle = (priorityId, isFinished = false) => {
  if (isFinished) {
    return {
      priorityDotColor: "bg-gray-300",
      priorityTextColor: "text-gray-400",
      priorityContainerColor: "bg-gray-100",
    };
  }

  const config = TASK_PRIORITIES[priorityId] || {};

  return {
    priorityDotColor: config.priorityDotColor || "bg-gray-400",
    priorityTextColor: config.priorityTextColor || "text-gray-400",
    priorityContainerColor: config.priorityBgColor || "bg-white",
  };
};
