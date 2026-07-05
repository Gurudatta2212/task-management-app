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
    },
    {
      priority: "Medium",
      count: medium,
    },
    {
      priority: "Low",
      count: low,
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Priority Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="priority" />

          <YAxis />

          <Tooltip />

          <Bar
  dataKey="count"
  radius={[8, 8, 0, 0]}
>
  {data.map((entry, index) => (
    <Cell
      key={index}
      fill={
        entry.priority === "High"
          ? "#ef4444"
          : entry.priority === "Medium"
          ? "#f59e0b"
          : "#22c55e"
      }
    />
  ))}
</Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriorityChart;