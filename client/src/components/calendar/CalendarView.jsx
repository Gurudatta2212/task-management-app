import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar.css";

function CalendarView({ tasks }) {
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const selectedTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    return (
      new Date(task.dueDate).toDateString() ===
      selectedDate.toDateString()
    );
  });

  return (
    <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900">

      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        📅 Task Calendar
      </h2>

      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        className="rounded-2xl border-none"

        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          const dayTasks = tasks.filter((task) => {
            if (!task.dueDate) return false;

            return (
              new Date(task.dueDate).toDateString() ===
              date.toDateString()
            );
          });

          const completed = dayTasks.filter(
            (task) => task.status === "Completed"
          ).length;

          const pending = dayTasks.filter(
            (task) => task.status === "Pending"
          ).length;

          const high = dayTasks.filter(
            (task) =>
              task.priority === "High" &&
              task.status !== "Completed"
          ).length;

          return (
            <div className="mt-1 flex justify-center gap-1">

              {completed > 0 && (
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
              )}

              {pending > 0 && (
                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              )}

              {high > 0 && (
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
              )}

            </div>
          );
        }}
      />

      <div className="mt-8">

        <h3 className="mb-5 text-xl font-bold text-gray-800 dark:text-white">
          Tasks on{" "}
          {selectedDate.toLocaleDateString()}
        </h3>

        {selectedTasks.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">

            <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
              🎉 No Tasks
            </h3>

            <p className="mt-2 text-gray-500 dark:text-slate-400">
              There are no tasks scheduled for this date.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {selectedTasks.map((task) => (

              <div
                key={task._id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >

                <div>

                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {task.title}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {task.description ||
                      "No description"}
                  </p>

                  <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
                    Status : {task.status}
                  </p>

                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default CalendarView;