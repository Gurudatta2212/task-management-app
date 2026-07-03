import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import AddTaskModal from "../components/task/AddTaskModal";
import api from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

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

          {/* Task List */}
          <div className="mt-10 space-y-4">
            {loading ? (
              <div className="rounded-xl bg-white p-6 text-center shadow">
                Loading...
              </div>
            ) : tasks.length === 0 ? (
              <div className="rounded-xl bg-white p-6 text-center shadow">
                No tasks found.
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="rounded-xl bg-white p-5 shadow"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {task.title}
                    </h2>

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

                  <p className="mt-3 text-gray-600">
                    {task.description}
                  </p>
                </div>
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
    </div>
  );
}

export default Dashboard;