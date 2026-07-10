import { motion } from "framer-motion";

function EmptyState({ setIsModalOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        No Tasks Found
      </h2>

      {/* Description */}
      <p className="mt-3 text-slate-500 dark:text-slate-400">
        Create your first task to get started.
      </p>

      {/* Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        + Add Task
      </motion.button>
    </motion.div>
  );
}

export default EmptyState;