import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 dark:text-white"
      >
        {label}
      </label>

      {/* Input Field */}
      <div className="relative">
        <input
          id={name}
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-800 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-indigo-600 dark:text-slate-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;