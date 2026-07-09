function RecentActivity({ tasks }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg dark:border dark:border-slate-700 dark:bg-slate-900">

      <div className="space-y-4">

        {tasks.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center dark:border-slate-700">

            <div className="mb-4 text-5xl">
              🕒
            </div>

            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              No Recent Activity
            </h2>

            <p className="mt-2 text-gray-500 dark:text-slate-400">
              Your recent task activity will appear here.
            </p>

          </div>

        ) : (

          tasks.slice(0, 5).map((task) => (

            <div
              key={task._id}
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-slate-700"
            >

              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-slate-400">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                }`}
              >
                {task.status}
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default RecentActivity;