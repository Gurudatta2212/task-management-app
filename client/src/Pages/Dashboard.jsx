import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import AddTaskModal from "../components/task/AddTaskModal";
import api from "../services/api";
import TaskCard from "../components/task/TaskCard";
import EditTaskModal from "../components/task/EditTaskModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import TaskChart from "../components/dashboard/TaskChart";
import TaskPieChart from "../components/analytics/TaskPieChart";
import PriorityChart from "../components/analytics/PriorityChart";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [isSidebarOpen, setIsSidebarOpen] =
  useState(false);

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
  console.error(error);

  toast.error(
    error.response?.data?.message ||
      "Failed to load tasks."
  );
}finally {
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

  const completionRate =
  tasks.length === 0
    ? 0
    : Math.round((completed / tasks.length) * 100);

    const highPriority = tasks.filter(
  (task) => task.priority === "High"
).length;

const overdueTasks = tasks.filter(
  (task) =>
    task.dueDate &&
    task.status !== "Completed" &&
    new Date(task.dueDate) < new Date()
).length;

const dueToday = tasks.filter((task) => {
  if (!task.dueDate) return false;

  const today = new Date();
  const due = new Date(task.dueDate);

  return (
    today.toDateString() === due.toDateString()
  );
}).length;

const upcomingTasks = tasks
  .filter(
    (task) =>
      task.dueDate &&
      task.status !== "Completed" &&
      new Date(task.dueDate) >= new Date()
  )
  .sort(
    (a, b) =>
      new Date(a.dueDate) - new Date(b.dueDate)
  )
  .slice(0, 5);

  const filteredTasks = tasks
  .filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (task.description || "")
  .toLowerCase()
  .includes(search.toLowerCase())

    const matchesFilter =
      filter === "All"
        ? true
        : task.status === filter;

    return matchesSearch && matchesFilter;
  })
  .sort((a, b) => {
    if (sortBy === "Newest") {
      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );
    }

    if (sortBy === "Oldest") {
      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    }

    if (sortBy === "Priority") {
      const order = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      return (
        order[b.priority] -
        order[a.priority]
      );
    }

    return 0;
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-100">
      <Sidebar
  isOpen={isSidebarOpen}
  setIsOpen={setIsSidebarOpen}
/>

      <div className="flex flex-1 flex-col">
        <Navbar
  setIsSidebarOpen={setIsSidebarOpen}
/>

        <main className="flex-1 p-8">
          {/* Header */}
          <motion.div
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
>
  <div>
    <h1 className="text-5xl font-extrabold text-gray-900">
      My Tasks
    </h1>

    <p className="mt-3 text-lg text-gray-500">
      Organize, track and complete your work efficiently.
    </p>
  </div>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setIsModalOpen(true)}
    className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-7 py-4 text-lg font-semibold text-white shadow-lg"
  >
    + Add Task
  </motion.button>
</motion.div>


          {/* Stats */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  className="grid gap-6 md:grid-cols-3"
>
  <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-xl">
    <p className="text-lg opacity-80">
      Total Tasks
    </p>

    <h2 className="mt-4 text-6xl font-bold">
      {tasks.length}
    </h2>
  </div>

  <div className="rounded-3xl bg-gradient-to-r from-orange-400 to-yellow-500 p-8 text-white shadow-xl">
    <p className="text-lg opacity-80">
      Pending
    </p>

    <h2 className="mt-4 text-6xl font-bold">
      {pending}
    </h2>
  </div>

  <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-xl">
    <p className="text-lg opacity-80">
      Completed
    </p>

    <h2 className="mt-4 text-6xl font-bold">
      {completed}
    </h2>

    <p className="mt-4 text-lg opacity-80">
      {completionRate}% Completed
    </p>
  </div>
</motion.div>

          <div className="mt-10 rounded-3xl bg-white p-6 shadow-lg">
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <input
      type="text"
      placeholder="🔍 Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-xl border border-gray-200 px-5 py-3 shadow-sm outline-none transition focus:border-indigo-500 md:w-96"
    />

    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="rounded-xl border border-gray-200 px-5 py-3 shadow-sm outline-none transition focus:border-indigo-500"
    >
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>

<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="rounded-xl border border-gray-200 px-5 py-3 shadow-sm outline-none transition focus:border-indigo-500"
>
  <option value="Newest">
    Newest
  </option>

  <option value="Oldest">
    Oldest
  </option>

  <option value="Priority">
    Priority
  </option>
</select>

  </div>
</div>

<div className="mt-10">
  <TaskChart
    pending={pending}
    completed={completed}
  />
</div>

<div className="mt-8 grid gap-6 md:grid-cols-4">

  <div className="rounded-2xl bg-red-500 p-6 text-white shadow-lg">
    <p>🔥 High Priority</p>
    <h2 className="mt-3 text-4xl font-bold">
      {highPriority}
    </h2>
  </div>

  <div className="rounded-2xl bg-orange-500 p-6 text-white shadow-lg">
    <p>⚠️ Overdue</p>
    <h2 className="mt-3 text-4xl font-bold">
      {overdueTasks}
    </h2>
  </div>

  <div className="rounded-2xl bg-blue-500 p-6 text-white shadow-lg">
    <p>📅 Due Today</p>
    <h2 className="mt-3 text-4xl font-bold">
      {dueToday}
    </h2>
  </div>

  <div className="rounded-2xl bg-green-600 p-6 text-white shadow-lg">
    <p>📈 Completion</p>
    <h2 className="mt-3 text-4xl font-bold">
      {completionRate}%
    </h2>
  </div>

</div>

<div className="mt-10 grid gap-6 lg:grid-cols-2">
  <TaskPieChart tasks={tasks} />

  <PriorityChart tasks={tasks} />
</div>

<div className="mt-10 rounded-3xl bg-white p-6 shadow-lg">
  <h2 className="mb-5 text-2xl font-bold text-gray-800">
    Recent Activity
  </h2>

  <div className="space-y-4">
    {tasks.slice(0, 5).map((task) => (
      <div
        key={task._id}
        className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
      >
        <div>
          <h3 className="font-semibold text-gray-800">
            {task.title}
          </h3>

          <p className="text-sm text-gray-500">
            {new Date(task.createdAt).toLocaleString()}
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
    ))}
  </div>
</div>

<div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
  <h2 className="mb-5 text-2xl font-bold text-gray-800">
    Upcoming Deadlines
  </h2>

  {upcomingTasks.length === 0 ? (
    <p className="text-gray-500">
      No upcoming deadlines.
    </p>
  ) : (
    <div className="space-y-4">
      {upcomingTasks.map((task) => (
        <div
          key={task._id}
          className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
        >
          <div>
            <h3 className="font-semibold">
              {task.title}
            </h3>

            <p className="text-sm text-gray-500">
              Due{" "}
              {new Date(
                task.dueDate
              ).toLocaleDateString()}
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              task.priority === "High"
                ? "bg-red-100 text-red-700"
                : task.priority === "Medium"
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {task.priority}
          </span>
        </div>
      ))}
    </div>
  )}
</div>

          {/* Task List */}
          <div className="mt-8 space-y-6">
            {loading ? (
  <div className="flex justify-center py-20">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
  </div>
) : filteredTasks.length === 0 ? (
  <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
    <h2 className="text-2xl font-bold text-gray-700">
      No Tasks Found
    </h2>

    <p className="mt-2 text-gray-500">
      Create your first task to get started.
    </p>

    <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setIsModalOpen(true)}
  className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
>
  + Add Task
</motion.button>
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