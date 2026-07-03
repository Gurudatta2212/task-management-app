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
    <div className="rounded-xl bg-white p-5 shadow transition duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">
            {task.title}
          </h2>

          <p className="mt-2 text-gray-600">
            {task.description || "No description"}
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-1 text-sm font-medium ${
            task.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => onToggleStatus(task)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-white transition ${
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
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;