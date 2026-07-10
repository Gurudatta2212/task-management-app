import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";
import Button from "../common/Button";
import Input from "../common/Input";

function AddTaskModal({
  isOpen,
  onClose,
  fetchTasks,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  if (!isOpen) return null;

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });

      fetchTasks();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create task."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Modal */}
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-lg
          overflow-y-auto
          rounded-2xl
          bg-white
          p-6
          shadow-xl
          dark:bg-slate-900
        "
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Add New Task
        </h2>

        <p className="mt-2 text-gray-500 dark:text-slate-300">
          Create a new task to manage your work.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {/* Task Title */}
          <Input
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter task description"
              className="
                resize-none
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                py-3
                text-gray-800
                outline-none
                transition
                focus:border-indigo-600
                focus:ring-2
                focus:ring-indigo-200
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          {/* Priority */}
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
              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>
            </select>
          </div>

          {/* Due Date */}
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

          {/* Action Buttons */}
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
              Save Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;