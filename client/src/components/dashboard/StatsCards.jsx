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
      className="grid gap-6 md:grid-cols-3"
    >
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-xl">
        <p className="text-lg opacity-80">
          Total Tasks
        </p>

        <h2 className="mt-4 text-6xl font-bold">
          {tasks.length}
        </h2>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-orange-400 to-yellow-500 p-6 text-white shadow-xl">
        <p className="text-lg opacity-80">
          Pending
        </p>

        <h2 className="mt-4 text-6xl font-bold">
          {pending}
        </h2>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-xl">
        <p className="text-lg opacity-80">
          Completed
        </p>

        <h2 className="mt-4 text-6xl font-bold">
          {completed}
        </h2>

        <p className="mt-4 text-lg opacity-80">
          {completionRate}% Completed
        </p>
      </div>
    </motion.div>
  );
}

export default StatsCards;