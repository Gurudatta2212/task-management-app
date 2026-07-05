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

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCards";
import SearchFilter from "../components/dashboard/SearchFilter";
import AnalyticsCards from "../components/dashboard/AnalyticsCards";
import TaskList from "../components/dashboard/TaskList";
import RecentActivity from "../components/dashboard/RecentActivity";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";

import useTasks from "../hooks/useTasks";
import useTaskAnalytics from "../hooks/useTaskAnalytics";

function Dashboard() {
  const { tasks, setTasks, loading, fetchTasks, handleDelete, handleToggleStatus,} = useTasks();
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

const { completed, pending, completionRate, highPriority, overdueTasks, dueToday, upcomingTasks, filteredTasks } = useTaskAnalytics(tasks, search, filter, sortBy);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Sidebar
  isOpen={isSidebarOpen}
  setIsOpen={setIsSidebarOpen}
/>

      <div className="flex flex-1 flex-col overflow-hidden md:ml-72">
        <Navbar
  setIsSidebarOpen={setIsSidebarOpen}
/>

        <main className="flex-1 overflow-y-auto p-8">
      
        <DashboardHeader
  setIsModalOpen={setIsModalOpen}
/>

          <StatsCards
  tasks={tasks}
  pending={pending}
  completed={completed}
  completionRate={completionRate}
/>

<SearchFilter
  search={search}
  setSearch={setSearch}
  filter={filter}
  setFilter={setFilter}
  sortBy={sortBy}
  setSortBy={setSortBy}
/>

<div className="mt-10">
  <TaskChart
    pending={pending}
    completed={completed}
  />
</div>

<AnalyticsCards
  highPriority={highPriority}
  overdueTasks={overdueTasks}
  dueToday={dueToday}
  completionRate={completionRate}
/>


<div className="mt-10 grid gap-6 lg:grid-cols-2">
  <TaskPieChart tasks={tasks} />

  <PriorityChart tasks={tasks} />
</div>

<RecentActivity tasks={tasks} />

<UpcomingDeadlines
  upcomingTasks={upcomingTasks}
/>

          <TaskList
  loading={loading}
  tasks={filteredTasks}
  onDelete={handleDelete}
  onEdit={handleEdit}
  onToggleStatus={handleToggleStatus}
  setIsModalOpen={setIsModalOpen}
/>

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