import { FaUserCircle, FaBars, FaMoon, FaSun } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import NotificationBell from "../notifications/NotificationBell";

function Navbar({
  setIsSidebarOpen,
  tasks,
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const { darkMode, setDarkMode } =
    useContext(ThemeContext);

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80 md:px-8">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-2xl text-gray-700 dark:text-white md:hidden"
        >
          <FaBars />
        </button>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h2>

          <p className="hidden text-sm text-gray-500 dark:text-slate-300 sm:block">
            Welcome back! Manage your tasks efficiently.
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Theme */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="rounded-full bg-indigo-100 p-3 text-indigo-600 transition hover:bg-indigo-200 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
        >
          {darkMode ? (
            <FaSun />
          ) : (
            <FaMoon />
          )}
        </button>

        {/* Notifications */}
        <NotificationBell tasks={tasks} />

        {/* User */}
        <FaUserCircle className="text-4xl text-indigo-600 md:text-5xl" />

        <div className="hidden text-right sm:block">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {user?.name || "User"}
          </h3>

          <p className="text-sm text-gray-500 dark:text-slate-300">
            {user?.email ||
              "user@example.com"}
          </p>
        </div>

      </div>

    </header>
  );
}

export default Navbar;