import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import {
  FaUserCircle,
  FaEnvelope,
  FaUser,
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

import api from "../services/api";
import { toast } from "react-toastify";
import useTasks from "../hooks/useTasks";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const {
  tasks,
  fetchTasks,
} = useTasks();

const [isSidebarOpen, setIsSidebarOpen] =
  useState(false);

const [form, setForm] = useState({
  name: user?.name || "",
  currentPassword: "",
  newPassword: "",
});

const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put(
      "/users/profile",
      {
        name: form.name,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    toast.success(response.data.message);

    window.location.reload();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to update profile."
    );
  }
};

useEffect(() => {
  fetchTasks();
}, []);

const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.status === "Completed"
).length;

const pendingTasks = tasks.filter(
  (task) => task.status === "Pending"
).length;

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

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-full justify-center">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900 sm:p-8 lg:p-10"
          >
            {/* Avatar */}

            <div className="flex flex-col items-center">
              <FaUserCircle className="text-9xl text-indigo-600" />

              <h2 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
  {form.name}
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
  {form.name}
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

  <div className="rounded-2xl bg-indigo-600 p-4 text-center text-white shadow-lg">
    <FaTasks className="mx-auto mb-3 text-3xl" />

    <h2 className="text-3xl font-bold">
      {totalTasks}
    </h2>

    <p className="mt-2 text-sm">
      Total Tasks
    </p>
  </div>

  <div className="rounded-2xl bg-green-600 p-6 text-center text-white">
    <FaCheckCircle className="mx-auto mb-3 text-3xl" />

    <h2 className="text-3xl font-bold">
      {completedTasks}
    </h2>

    <p className="mt-2 text-sm">
      Completed
    </p>
  </div>

  <div className="rounded-2xl bg-orange-500 p-6 text-center text-white">
    <FaClock className="mx-auto mb-3 text-3xl" />

    <h2 className="text-3xl font-bold">
      {pendingTasks}
    </h2>

    <p className="mt-2 text-sm">
      Pending
    </p>
  </div>

</div>

{/* Edit Profile */}

<div className="mt-10 rounded-3xl border border-gray-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
  <h2 className="mb-6 text-2xl font-bold text-gray-500 dark:text-white">
    Edit Profile
  </h2>

  <div className="space-y-5">
    <div>
      <label className="mb-2 block font-medium dark:text-white">
        Full Name
      </label>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-indigo-600 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
      />
    </div>

    <div>
      <label className="mb-2 block font-medium dark:text-white">
        Current Password
      </label>

      <input
        type="password"
        name="currentPassword"
        value={form.currentPassword}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-indigo-600 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
      />
    </div>

    <div>
      <label className="mb-2 block font-medium dark:text-white">
        New Password
      </label>

      <input
        type="password"
        name="newPassword"
        value={form.newPassword}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-indigo-600 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
      />
    </div>

    <button
      onClick={handleSave}
      className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
    >
      Save Changes
    </button>
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