import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import {
  FaUserCircle,
  FaEnvelope,
  FaUser,
  FaTasks,
} from "react-icons/fa";
import { motion } from "framer-motion";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-slate-950">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex flex-1 flex-col md:ml-72">
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4">
          
        <div className="flex min-h-full items-center justify-center">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 shadow-xl dark:border-slate-700 dark:bg-slate-900"
          >
            {/* Avatar */}

            <div className="flex flex-col items-center">
              <FaUserCircle className="text-9xl text-indigo-600" />

              <h2 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>

            {/* Divider */}

            <div className="my-10 border-t border-gray-200 dark:border-slate-700"></div>

            {/* Information */}

            <div className="grid gap-6 md:grid-cols-2">

              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
                <div className="mb-3 flex items-center gap-3">
                  <FaUser className="text-indigo-600" />

                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Full Name
                  </h3>
                </div>

                <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                  {user?.name}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
                <div className="mb-3 flex items-center gap-3">
                  <FaEnvelope className="text-indigo-600" />

                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Email
                  </h3>
                </div>

                <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                  {user?.email}
                </p>
              </div>

            </div>

            {/* Stats */}

            <div className="mt-10 grid gap-5 md:grid-cols-3">

              <div className="rounded-2xl bg-indigo-600 p-6 text-center text-white">
                <FaTasks className="mx-auto mb-3 text-3xl" />

                <h2 className="text-3xl font-bold">
                  --
                </h2>

                <p className="mt-2 text-sm">
                  Total Tasks
                </p>
              </div>

              <div className="rounded-2xl bg-green-600 p-6 text-center text-white">
                <h2 className="text-3xl font-bold">
                  Active
                </h2>

                <p className="mt-2 text-sm">
                  Account Status
                </p>
              </div>

              <div className="rounded-2xl bg-purple-600 p-6 text-center text-white">
                <h2 className="text-3xl font-bold">
                  2026
                </h2>

                <p className="mt-2 text-sm">
                  Joined
                </p>
              </div>

            </div>
          </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;