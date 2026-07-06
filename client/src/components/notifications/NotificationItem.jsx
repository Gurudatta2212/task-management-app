function NotificationItem({
  icon,
  title,
  message,
  color,
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
      <div
        className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${color}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          {message}
        </p>
      </div>
    </div>
  );
}

export default NotificationItem;