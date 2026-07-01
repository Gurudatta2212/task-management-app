function Button({
  type = "button",
  children,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-lg bg-indigo-600 px-4 py-3 text-white font-medium transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;