import {
  FaEdit,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            task.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
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
    </div>
  );
}

export default TaskCard;