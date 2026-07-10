import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#F59E0B",
  "#22C55E",
];

function TaskChart({
  pending,
  completed,
}) {
  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">
      {/* Header */}
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Task Analytics
      </h2>

      {/* Pie Chart */}
      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TaskChart;