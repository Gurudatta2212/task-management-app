import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell({ tasks = [] }) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const overdue = tasks.filter(
    (task) =>
      task.status !== "Completed" &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
  );

  const dueToday = tasks.filter((task) => {
  if (!task.dueDate) return false;

  return (
    task.status !== "Completed" &&
    new Date(task.dueDate).toDateString() ===
      new Date().toDateString()
  );
});

  const highPriority = tasks.filter(
    (task) =>
      task.priority === "High" &&
      task.status !== "Completed"
  );

  const count =
    overdue.length +
    dueToday.length +
    highPriority.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
  onClick={() => setOpen((prev) => !prev)}
  className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition hover:bg-indigo-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 sm:h-12 sm:w-12"
>
        <FaBell className="text-base sm:text-lg" />

        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white sm:-right-1 sm:-top-1 sm:h-5 sm:w-5 sm:text-xs">
            {count}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <NotificationDropdown
            overdue={overdue}
            dueToday={dueToday}
            highPriority={highPriority}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationBell;