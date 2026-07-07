import {
  FaBars,
  FaMoon,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";
import { useContext } from "react";
import { Link } from "react-router-dom";
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
            Welcome back,
            <span className="ml-1 font-semibold text-indigo-600 dark:text-indigo-400">
              {user?.name || "User"}
            </span>{" "}
            👋
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
          className="rounded-full bg-indigo-100 p-4 text-indigo-600 transition hover:bg-indigo-200 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700"
        >
          {darkMode ? (
            <FaSun />
          ) : (
            <FaMoon />
          )}
        </button>

        {/* Notifications */}
        <NotificationBell tasks={tasks} />

        {/* Profile */}
        <Link
          to="/profile"
          className="group relative"
        >
          <FaUserCircle className="cursor-pointer text-5xl text-indigo-600 transition duration-300 hover:scale-110" />

          {/* Hover Card */}
          <div className="pointer-events-none absolute right-0 top-12 hidden w-56 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl group-hover:block dark:border-slate-700 dark:bg-slate-900">

            <h3 className="font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 break-all">
              {user?.email}
            </p>

          </div>

        </Link>

      </div>

    </header>
  );
}

export default Navbar;