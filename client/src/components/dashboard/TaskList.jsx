import TaskCard from "../task/TaskCard";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

function TaskList({
  loading,
  tasks,
  onDelete,
  onEdit,
  onToggleStatus,
  setIsModalOpen,
}) {
  // Show loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show empty state when no tasks are available
  if (tasks.length === 0) {
    return (
      <EmptyState
        setIsModalOpen={setIsModalOpen}
      />
    );
  }

  // Render task list
  return (
    <div className="mt-8 space-y-6">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;