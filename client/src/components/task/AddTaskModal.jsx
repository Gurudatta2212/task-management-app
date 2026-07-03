import { useState } from "react";
import api from "../../services/api";

import Button from "../common/Button";
import Input from "../common/Input";

function AddTaskModal({ isOpen, onClose, fetchTasks }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  if (!isOpen) return null;

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

      const response = await api.post(
        "/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setFormData({
        title: "",
        description: "",
      });

      fetchTasks();

      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to create task."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800">
          Add New Task
        </h2>

        <p className="mt-2 text-gray-500">
          Create a new task to manage your work.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <Input
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter task description"
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />
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
              Save Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;