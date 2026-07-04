import {
  FaEdit,
  FaTrash,
  FaCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";

    case "Medium":
      return "bg-yellow-100 text-yellow-700";

    case "Low":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const isOverdue = (task) => {
  if (!task.dueDate) return false;

  return (
    task.status !== "Completed" &&
    new Date(task.dueDate) < new Date()
  );
};

function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {task.title}
          </h2>

          <p className="mt-3 leading-7 text-gray-500">
            {task.description || "No description"}
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Created on{" "}
            {task.createdAt
              ? new Date(task.createdAt).toLocaleDateString()
              : "-"}
          </p>

          <p className="mt-2 text-sm text-indigo-600">
            Due Date{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "Not Set"}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              task.status === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {task.status}
          </span>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority}
          </span>

          {isOverdue(task) && (
            <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
              Overdue
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onToggleStatus(task)}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-white transition ${
            task.status === "Completed"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <FaCheck />
          {task.status === "Completed"
            ? "Mark Pending"
            : "Complete"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;