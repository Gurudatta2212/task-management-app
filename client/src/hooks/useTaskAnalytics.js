function useTaskAnalytics(
  tasks,
  search,
  filter,
  sortBy
) {
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      task.status !== "Completed" &&
      new Date(task.dueDate) < new Date()
  ).length;

  const dueToday = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const today = new Date();
    const due = new Date(task.dueDate);

    return (
      today.toDateString() ===
      due.toDateString()
    );
  }).length;

  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.dueDate &&
        task.status !== "Completed" &&
        new Date(task.dueDate) >= new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0, 5);

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (task.description || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : task.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    })
    .sort((a, b) => {
      if (sortBy === "Newest") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      if (sortBy === "Oldest") {
        return (
          new Date(a.createdAt) -
          new Date(b.createdAt)
        );
      }

      if (sortBy === "Priority") {
        const order = {
          High: 3,
          Medium: 2,
          Low: 1,
        };

        return (
          order[b.priority] -
          order[a.priority]
        );
      }

      return 0;
    });

  return {
    completed,
    pending,
    completionRate,
    highPriority,
    overdueTasks,
    dueToday,
    upcomingTasks,
    filteredTasks,
  };
}

export default useTaskAnalytics;