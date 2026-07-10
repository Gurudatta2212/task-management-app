function AnalyticsCards({
  highPriority,
  overdueTasks,
  dueToday,
  completionRate,
}) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-4">
      {/* High Priority Card */}
      <div className="rounded-2xl bg-red-500 p-6 text-white shadow-lg">
        <p>🔥 High Priority</p>

        <h2 className="mt-3 text-4xl font-bold">
          {highPriority}
        </h2>
      </div>

      {/* Overdue Tasks Card */}
      <div className="rounded-2xl bg-orange-500 p-6 text-white shadow-lg">
        <p>⚠️ Overdue</p>

        <h2 className="mt-3 text-4xl font-bold">
          {overdueTasks}
        </h2>
      </div>

      {/* Due Today Card */}
      <div className="rounded-2xl bg-blue-500 p-6 text-white shadow-lg">
        <p>📅 Due Today</p>

        <h2 className="mt-3 text-4xl font-bold">
          {dueToday}
        </h2>
      </div>

      {/* Completion Rate Card */}
      <div className="rounded-2xl bg-green-600 p-6 text-white shadow-lg">
        <p>📈 Completion</p>

        <h2 className="mt-3 text-4xl font-bold">
          {completionRate}%
        </h2>
      </div>
    </div>
  );
}

export default AnalyticsCards;