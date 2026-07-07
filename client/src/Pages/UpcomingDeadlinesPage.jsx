import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import useTasks from "../hooks/useTasks";

function UpcomingDeadlinesPage() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const {
    tasks,
    fetchTasks,
    loading,
  } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.dueDate &&
        task.status !== "Completed" &&
        new Date(task.dueDate) >= new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-slate-950">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1 flex-col md:ml-72">
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
          tasks={tasks}
        />

        <main className="flex-1 overflow-y-auto p-8">

          <h1 className="mb-8 text-4xl font-bold dark:text-white">
            Upcoming Deadlines
          </h1>

          {!loading && (
            <UpcomingDeadlines
              upcomingTasks={upcomingTasks}
            />
          )}

        </main>
      </div>
    </div>
  );
}

export default UpcomingDeadlinesPage;