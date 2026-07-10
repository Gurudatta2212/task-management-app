import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

function PriorityChart({ tasks }) {
  const high = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const medium = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const low = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  const data = [
    {
      priority: "High",
      count: high,
      color: "#ef4444",
    },
    {
      priority: "Medium",
      count: medium,
      color: "#f97316",
    },
    {
      priority: "Low",
      count: low,
      color: "#22c55e",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Priority Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Distribution of tasks by priority
          </p>
        </div>

        <div className="rounded-xl bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          {tasks.length} Tasks
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} barCategoryGap={45}>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#d1d5db"
          />

          <XAxis
            dataKey="priority"
            tick={{
              fill: "#64748b",
              fontSize: 14,
            }}
          />

          <YAxis
            allowDecimals={false}
            tick={{
              fill: "#64748b",
            }}
          />

          <Tooltip
            cursor={{
              fill: "#f1f5f9",
            }}
          />

          <Bar
            dataKey="count"
            radius={[12, 12, 0, 0]}
          >
            {data.map((item, index) => (
              <Cell
                key={index}
                fill={item.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Statistics Cards */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-red-50 p-4 text-center dark:bg-red-900/30">
          <p className="text-3xl font-bold text-red-600">
            {high}
          </p>

          <p className="mt-1 text-sm text-red-500">
            High
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4 text-center dark:bg-orange-900/30">
          <p className="text-3xl font-bold text-orange-600">
            {medium}
          </p>

          <p className="mt-1 text-sm text-orange-500">
            Medium
          </p>
        </div>

        <div className="rounded-2xl bg-green-50 p-4 text-center dark:bg-green-900/30">
          <p className="text-3xl font-bold text-green-600">
            {low}
          </p>

          <p className="mt-1 text-sm text-green-500">
            Low
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default PriorityChart;