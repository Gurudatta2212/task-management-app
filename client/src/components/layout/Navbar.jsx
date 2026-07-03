import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Welcome back! Manage your tasks efficiently.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <FaUserCircle className="text-4xl text-indigo-600" />

        <div className="text-right">
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