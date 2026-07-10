import { motion } from "framer-motion";

function StatsCards({
  tasks,
  pending,
  completed,
  completionRate,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid gap-4 md:grid-cols-3"
    >
      {/* Total Tasks Card */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white shadow-lg">
        <p className="text-base opacity-90">
          Total Tasks
        </p>

        <h2 className="mt-2 text-5xl font-bold">
          {tasks.length}
        </h2>
      </div>

      {/* Pending Tasks Card */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-500 p-4 text-white shadow-lg">
        <p className="text-base opacity-90">
          Pending
        </p>

        <h2 className="mt-2 text-5xl font-bold">
          {pending}
        </h2>
      </div>

      {/* Completed Tasks Card */}
      <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white shadow-lg">
        <p className="text-base opacity-90">
          Completed
        </p>

        <h2 className="mt-2 text-5xl font-bold">
          {completed}
        </h2>

        <p className="mt-2 text-sm opacity-90">
          {completionRate}% Completed
        </p>
      </div>
    </motion.div>
  );
}

export default StatsCards;