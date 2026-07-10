import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";

function DashboardHeader({
  setIsModalOpen,
  onExportPdf,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
    >
      {/* Left Section */}
      <div>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          My Tasks
        </h1>

        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
          Organize, track and complete your work efficiently.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap gap-4">
        {/* Export PDF Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExportPdf}
          className="flex items-center gap-3 rounded-2xl border-2 border-red-600 bg-white px-6 py-4 font-semibold text-red-600 shadow-md transition hover:bg-red-600 hover:text-white dark:bg-slate-900"
        >
          <FaFilePdf className="text-xl" />
          Export PDF
        </motion.button>

        {/* Add Task Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-7 py-4 text-lg font-semibold text-white shadow-lg"
        >
          + Add Task
        </motion.button>
      </div>
    </motion.div>
  );
}

export default DashboardHeader;