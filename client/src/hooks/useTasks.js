import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.tasks);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete task."
      );
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `/tasks/${task._id}`,
        {
          status:
            task.status === "Pending"
              ? "Completed"
              : "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update task."
      );
    }
  };

  return {
    tasks,
    setTasks,
    loading,
    fetchTasks,
    handleDelete,
    handleToggleStatus,
  };
}

export default useTasks;