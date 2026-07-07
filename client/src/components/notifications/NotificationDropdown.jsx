import {
  FaExclamationTriangle,
  FaCalendarDay,
  FaFire,
} from "react-icons/fa";
import { motion } from "framer-motion";

function NotificationDropdown({
  overdue,
  dueToday,
  highPriority,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 10,
        scale: 0.95,
      }}
      transition={{
        duration: 0.25,
      }}
      className="absolute right-0 top-14 z-50 w-96 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 className="mb-5 text-xl font-bold text-gray-800 dark:text-white">
        Notifications
      </h2>

      <div className="max-h-96 space-y-4 overflow-y-auto">

        {/* High Priority */}

        {highPriority.length > 0 && (
          <>
            <h3 className="text-sm font-bold uppercase tracking-wide text-orange-600">
              High Priority
            </h3>

            {highPriority.map((task) => (
              <div
                key={task._id}
                className="flex items-start gap-3 rounded-xl bg-orange-50 p-3 dark:bg-orange-900/20"
              >
                <FaFire className="mt-1 text-orange-600" />

                <div>
                  <p className="font-semibold text-orange-700 dark:text-orange-300">
                    {task.title}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Needs your immediate attention.
                  </p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Due Today */}

        {dueToday.length > 0 && (
          <>
            <h3 className="text-sm font-bold uppercase tracking-wide text-yellow-600">
              Due Today
            </h3>

            {dueToday.map((task) => (
              <div
                key={task._id}
                className="flex items-start gap-3 rounded-xl bg-yellow-50 p-3 dark:bg-yellow-900/20"
              >
                <FaCalendarDay className="mt-1 text-yellow-600" />

                <div>
                  <p className="font-semibold text-yellow-700 dark:text-yellow-300">
                    {task.title}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Due today.
                  </p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Overdue */}

        {overdue.length > 0 && (
          <>
            <h3 className="text-sm font-bold uppercase tracking-wide text-red-600">
              Overdue
            </h3>

            {overdue.map((task) => (
              <div
                key={task._id}
                className="flex items-start gap-3 rounded-xl bg-red-50 p-3 dark:bg-red-900/20"
              >
                <FaExclamationTriangle className="mt-1 text-red-600" />

                <div>
                  <p className="font-semibold text-red-700 dark:text-red-300">
                    {task.title}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Task is overdue.
                  </p>
                </div>
              </div>
            ))}
          </>
        )}

        {highPriority.length === 0 &&
          dueToday.length === 0 &&
          overdue.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                🎉 You're all caught up!
              </p>
            </div>
          )}

      </div>
    </motion.div>
  );
}

export default NotificationDropdown;