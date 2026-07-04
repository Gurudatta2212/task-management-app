import { FaUserCircle, FaBars } from "react-icons/fa";

function Navbar({ setIsSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-2xl text-gray-700 md:hidden"
        >
          <FaBars />
        </button>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h2>

          <p className="hidden text-sm text-gray-500 sm:block">
            Welcome back! Manage your tasks efficiently.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <FaUserCircle className="text-4xl text-indigo-600 md:text-5xl" />

        <div className="hidden text-right sm:block">
          <h3 className="font-semibold text-gray-800">
            {user?.name || "User"}
          </h3>

          <p className="text-sm text-gray-500">
            {user?.email || "user@example.com"}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;