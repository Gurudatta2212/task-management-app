import { motion } from "framer-motion";

function EmptyState({ setIsModalOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        No Tasks Found
      </h2>

      <p className="mt-3 text-slate-500 dark:text-slate-400">
        Create your first task to get started.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        + Add Task
      </motion.button>
    </motion.div>
  );
}

export default EmptyState;