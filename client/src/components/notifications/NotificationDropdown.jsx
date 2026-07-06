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
        ease: "easeOut",
      }}
      className="absolute right-0 top-14 z-50 w-96 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
        Notifications
      </h2>

      <div className="max-h-96 space-y-3 overflow-y-auto">

        {overdue.map((task) => (
          <div
            key={`overdue-${task._id}`}
            className="flex items-start gap-3 rounded-xl bg-red-50 p-3 dark:bg-red-900/20"
          >
            <FaExclamationTriangle className="mt-1 text-red-600" />

            <div>
              <h3 className="font-semibold text-red-700 dark:text-red-300">
                Overdue Task
              </h3>

              <p className="text-sm text-gray-600 dark:text-slate-300">
                <span className="font-medium">
                  {task.title}
                </span>{" "}
                is overdue.
              </p>
            </div>
          </div>
        ))}

        {dueToday.map((task) => (
          <div
            key={`today-${task._id}`}
            className="flex items-start gap-3 rounded-xl bg-yellow-50 p-3 dark:bg-yellow-900/20"
          >
            <FaCalendarDay className="mt-1 text-yellow-600" />

            <div>
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">
                Due Today
              </h3>

              <p className="text-sm text-gray-600 dark:text-slate-300">
                <span className="font-medium">
                  {task.title}
                </span>{" "}
                is due today.
              </p>
            </div>
          </div>
        ))}

        {highPriority.map((task) => (
          <div
            key={`priority-${task._id}`}
            className="flex items-start gap-3 rounded-xl bg-orange-50 p-3 dark:bg-orange-900/20"
          >
            <FaFire className="mt-1 text-orange-600" />

            <div>
              <h3 className="font-semibold text-orange-700 dark:text-orange-300">
                High Priority
              </h3>

              <p className="text-sm text-gray-600 dark:text-slate-300">
                <span className="font-medium">
                  {task.title}
                </span>{" "}
                needs your attention.
              </p>
            </div>
          </div>
        ))}

        {overdue.length === 0 &&
          dueToday.length === 0 &&
          highPriority.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-slate-400">
                 No new notifications
              </p>
            </div>
          )}
      </div>
    </motion.div>
  );
}

export default NotificationDropdown;