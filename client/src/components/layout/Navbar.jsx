import { useContext } from "react";
import {
  FaBars,
  FaMoon,
  FaSun,
} from "react-icons/fa";
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
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white/80 px-3 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80 sm:px-4 md:px-8">
      {/* Left Section */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-2xl text-gray-700 dark:text-white md:hidden"
        >
          <FaBars />
        </button>

        {/* Dashboard Title */}
        <div>
          <h2 className="truncate text-lg font-bold text-gray-800 dark:text-white sm:text-xl md:text-2xl">
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

      {/* Right Section */}
      <div className="flex flex-shrink-0 items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition hover:bg-indigo-200 dark:bg-slate-800 dark:text-yellow-400 dark:hover:bg-slate-700 sm:h-12 sm:w-12"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notifications */}
        <NotificationBell tasks={tasks} />

        {/* User Profile */}
        <Link
          to="/profile"
          className="group relative flex-shrink-0"
        >
          {/* Avatar */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white shadow-md transition duration-300 hover:scale-110 sm:h-12 sm:w-12">
            {user?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          {/* Hover Card */}
          <div className="pointer-events-none absolute right-0 top-14 z-50 hidden w-56 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900 md:group-hover:block">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </h3>

            <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">
              {user?.email}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;