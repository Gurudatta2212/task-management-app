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
    status: "Pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold">
          Edit Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="w-auto bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="w-auto"
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