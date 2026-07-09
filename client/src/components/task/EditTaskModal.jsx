import { useEffect, useState } from "react";
import api from "../../services/api";
import Button from "../common/Button";
import Input from "../common/Input";
import { toast } from "react-toastify";

function EditTaskModal({
  isOpen,
  onClose,
  task,
  fetchTasks,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
  title: task.title,
  description: task.description,
  priority: task.priority || "Medium",
  dueDate: task.dueDate
    ? task.dueDate.split("T")[0]
    : "",
  status: task.status,
});
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `/tasks/${task._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      fetchTasks();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update task."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
  className="
    w-full
    max-w-lg
    max-h-[90vh]
    overflow-y-auto
    rounded-2xl
    bg-white
    p-6
    shadow-xl
    dark:bg-slate-900
  "
>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Edit Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 resize-none text-gray-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-gray-700 dark:text-white">
    Due Date
  </label>

  <input
    type="date"
    name="dueDate"
    value={formData.dueDate}
    onChange={handleChange}
    className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
  />
</div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
  type="button"
  onClick={onClose}
  className="w-full bg-gray-500 hover:bg-gray-600 sm:w-auto"
>
              Cancel
            </Button>

            <Button
  type="submit"
  className="w-full sm:w-auto"
>
              Update Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;