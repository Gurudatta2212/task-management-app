import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

function TaskPieChart({ tasks }) {
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const data = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Pending",
      value: pending,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Task Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Completed vs Pending Tasks
          </p>
        </div>

        <div className="rounded-xl bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          {tasks.length} Tasks
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={105}
            innerRadius={55}
            paddingAngle={4}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-2xl bg-green-50 p-4 text-center dark:bg-green-900/30">
          <p className="text-3xl font-bold text-green-600">
            {completed}
          </p>

          <p className="mt-1 text-sm text-green-500">
            Completed
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-4 text-center dark:bg-yellow-900/30">
          <p className="text-3xl font-bold text-yellow-600">
            {pending}
          </p>

          <p className="mt-1 text-sm text-yellow-500">
            Pending
          </p>
        </div>

      </div>
    </motion.div>
  );
}

export default TaskPieChart;