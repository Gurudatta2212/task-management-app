const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";

    case "Medium":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";

    default:
      return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
  }
};

function UpcomingDeadlines({ upcomingTasks }) {
  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg dark:bg-slate-900 dark:border dark:border-slate-700">

      {upcomingTasks.length === 0 ? (
        <p className="text-gray-500 dark:text-slate-400">
          No upcoming deadlines.
        </p>
      ) : (
        <div className="space-y-4">
          {upcomingTasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-slate-700"
            >
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingDeadlines;