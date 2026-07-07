import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import CalendarView from "../components/calendar/CalendarView";
import useTasks from "../hooks/useTasks";

function TaskCalendarPage() {
  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const {
    tasks,
    loading,
    fetchTasks,
  } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

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
            Task Calendar
          </h1>

          {!loading && (
            <CalendarView tasks={tasks} />
          )}

        </main>
      </div>
    </div>
  );
}

export default TaskCalendarPage;