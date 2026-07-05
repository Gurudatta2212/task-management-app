import { motion } from "framer-motion";

function DashboardHeader({ setIsModalOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          My Tasks
        </h1>

        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
          Organize, track and complete your work efficiently.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-7 py-4 text-lg font-semibold text-white shadow-lg"
      >
        + Add Task
      </motion.button>
    </motion.div>
  );
}

export default DashboardHeader;