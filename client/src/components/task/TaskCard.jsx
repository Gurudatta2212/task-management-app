import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaCalendarAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";

    case "Medium":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300";

    case "Low":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";

    default:
      return "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300";
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
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 dark:border-slate-700 dark:bg-slate-900"
    >
      {/* Top */}

      <div className="flex items-start justify-between gap-5">

        <div className="flex-1">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {task.title}
          </h2>

          <p className="mt-3 leading-7 text-gray-500 dark:text-slate-300">
            {task.description || "No description available"}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-5">

            <span className="text-sm text-slate-400">
              Created:
              {" "}
              {task.createdAt
                ? new Date(task.createdAt).toLocaleDateString()
                : "-"}
            </span>

            <span className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
              <FaCalendarAlt />

              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No Due Date"}
            </span>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-end gap-3">

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              task.status === "Completed"
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
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

      <div className="my-6 border-t border-gray-200 dark:border-slate-700"></div>

      {/* Buttons */}

      <div className="flex flex-wrap gap-3">

        <button
          onClick={() => onToggleStatus(task)}
          className={`rounded-xl px-5 py-3 font-semibold text-white transition-all duration-300 ${
            task.status === "Completed"
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <FaCheck className="mr-2 inline" />

          {task.status === "Completed"
            ? "Mark Pending"
            : "Complete"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FaEdit className="mr-2 inline" />

          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <FaTrash className="mr-2 inline" />

          Delete
        </button>

      </div>

    </motion.div>
  );
}

export default TaskCard;