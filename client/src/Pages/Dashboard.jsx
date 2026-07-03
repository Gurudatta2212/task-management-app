import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import AddTaskModal from "../components/task/AddTaskModal";
import api from "../services/api";
import TaskCard from "../components/task/TaskCard";
import EditTaskModal from "../components/task/EditTaskModal";
import { toast } from "react-toastify";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

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
      console.log(error);
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

const handleEdit = (task) => {
  setSelectedTask(task);
  setIsEditOpen(true);
};

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const filteredTasks = tasks.filter((task) => {
  const matchesSearch =
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" ? true : task.status === filter;

  return matchesSearch && matchesFilter;
});

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                My Tasks
              </h1>

              <p className="mt-2 text-gray-600">
                Manage all your tasks here.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              + Add Task
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-indigo-600 p-6 text-white shadow">
              <h3>Total Tasks</h3>

              <p className="mt-3 text-4xl font-bold">
                {tasks.length}
              </p>
            </div>

            <div className="rounded-xl bg-yellow-500 p-6 text-white shadow">
              <h3>Pending</h3>

              <p className="mt-3 text-4xl font-bold">
                {pending}
              </p>
            </div>

            <div className="rounded-xl bg-green-600 p-6 text-white shadow">
              <h3>Completed</h3>

              <p className="mt-3 text-4xl font-bold">
                {completed}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <input
    type="text"
    placeholder="🔍 Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600 md:w-96"
  />

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600"
  >
    <option value="All">All</option>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  </select>
</div>

          {/* Task List */}
          <div className="mt-10 space-y-4">
            {loading ? (
              <div className="rounded-xl bg-white p-6 text-center shadow">
                Loading...
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="rounded-xl bg-white p-6 text-center shadow">
                No tasks found.
              </div>
            ) : (
              filteredTasks.map((task) => (
  <TaskCard
    key={task._id}
    task={task}
    onDelete={handleDelete}
    onToggleStatus={handleToggleStatus}
    onEdit={handleEdit}
  />
))
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchTasks={fetchTasks}
      />

<EditTaskModal
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  task={selectedTask}
  fetchTasks={fetchTasks}
/>

    </div>
  );
}

export default Dashboard;