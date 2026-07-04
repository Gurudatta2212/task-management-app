import { NavLink, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  FaTasks,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <aside
  className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 md:static md:translate-x-0 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
      <div className="flex items-center justify-between border-b p-6">
        <h1 className="text-3xl font-bold text-indigo-600">
          Task Manager
        </h1>
        <button
  onClick={() => setIsOpen(false)}
  className="text-2xl md:hidden"
>
  <FaTimes />
</button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaTasks />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <FaUser />
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;