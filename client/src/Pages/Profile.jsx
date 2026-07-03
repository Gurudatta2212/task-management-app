import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow">
            <div className="flex flex-col items-center">
              <FaUserCircle className="text-8xl text-indigo-600" />

              <h2 className="mt-4 text-2xl font-bold">
                {user?.name}
              </h2>

              <p className="text-gray-500">
                {user?.email}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-sm text-gray-500">
                  Full Name
                </p>

                <p className="font-medium">
                  {user?.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-medium">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;