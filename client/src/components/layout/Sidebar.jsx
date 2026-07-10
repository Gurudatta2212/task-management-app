import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTasks,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaCalendarAlt,
  FaRegCalendarAlt,
  FaHistory,
} from "react-icons/fa";

function Sidebar({
  isOpen,
  setIsOpen,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-shrink-0 flex-col border-r border-gray-200 bg-white shadow-2xl transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900 md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-slate-700">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-600">
            Task Manager
          </h1>

          <p className="mt-1 text-xs text-slate-400">
            Productivity Dashboard
          </p>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="text-2xl text-gray-700 dark:text-white md:hidden"
        >
          <FaTimes />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {/* Dashboard */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-5 py-3 font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <FaTasks />
              Dashboard
            </NavLink>
          </li>

          {/* Recent Activity */}
          <li>
            <NavLink
              to="/recent-activity"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-5 py-3 font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <FaHistory />
              Recent Activity
            </NavLink>
          </li>

          {/* Upcoming Deadlines */}
          <li>
            <NavLink
              to="/upcoming-deadlines"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-5 py-3 font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <FaCalendarAlt />
              Upcoming Deadlines
            </NavLink>
          </li>

          {/* Task Calendar */}
          <li>
            <NavLink
              to="/task-calendar"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-5 py-3 font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <FaRegCalendarAlt />
              Task Calendar
            </NavLink>
          </li>

          {/* Profile */}
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-5 py-3 font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <FaUser />
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4 dark:border-slate-700">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white dark:bg-red-900/20"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;