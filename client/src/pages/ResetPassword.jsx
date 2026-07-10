import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/common/Button";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
  useState(false);

const [loading, setLoading] = useState(false);

const getPasswordStrength = (password) => {
  if (password.length < 6) {
    return {
      text: "Weak",
      color: "bg-red-500",
      width: "w-1/3",
    };
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial =
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    password.length >= 8 &&
    hasUpper &&
    hasNumber &&
    hasSpecial
  ) {
    return {
      text: "Strong",
      color: "bg-green-500",
      width: "w-full",
    };
  }

  return {
    text: "Medium",
    color: "bg-yellow-500",
    width: "w-2/3",
  };
};

const strength =
  passwords.newPassword.length > 0
    ? getPasswordStrength(
        passwords.newPassword
      )
    : null;

const passwordRef = useRef(null);

useEffect(() => {
  passwordRef.current?.focus();
}, []);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();

setLoading(true);

    if (
  passwords.newPassword !==
  passwords.confirmPassword
) {
  toast.warning("Passwords do not match.");
  setLoading(false);
  return;
}

    try {
      const response = await api.post(
        "/auth/reset-password",
        {
          email,
          otp,
          newPassword: passwords.newPassword,
        }
      );

      toast.success(response.data.message);

setPasswords({
  newPassword: "",
  confirmPassword: "",
});

      navigate("/");
    } catch (error) {
      toast.error(
error.response?.data?.message ||
"Failed to reset password."
);
    }
    finally {
  setLoading(false);
}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reset Password
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-300">
          Create a new password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white">
    New Password
  </label>

  <div className="relative">

    <input
      ref={passwordRef}
      type={showPassword ? "text" : "password"}
      name="newPassword"
      value={passwords.newPassword}
      onChange={handleChange}
      minLength={8}
      autoComplete="new-password"
      placeholder="Enter new password"
      required
      className="
      w-full
      rounded-xl
      border
      border-slate-300
      bg-white
      px-4
      py-3
      pr-12
      text-gray-800

      shadow-sm

      transition-all
      duration-300

      hover:border-indigo-400

      focus:border-indigo-600
      focus:ring-4
      focus:ring-indigo-300
      focus:outline-none

      dark:border-slate-700
      dark:bg-slate-800
      dark:text-white
      dark:placeholder:text-slate-400
      "
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword(!showPassword)
      }
      className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-500
      hover:text-indigo-600
      "
    >
      {showPassword ? (
        <FaEyeSlash />
      ) : (
        <FaEye />
      )}
    </button>

  </div>
</div>

{passwords.newPassword && (
  <div className="mt-3">

    <div className="mb-2 flex justify-between text-sm">

      <span className="text-gray-500">
        Password Strength
      </span>

      <span
        className={`font-semibold ${
          strength.text === "Strong"
            ? "text-green-600"
            : strength.text === "Medium"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {strength.text}
      </span>

    </div>

    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

      <div
        className={`h-full ${strength.color} ${strength.width} transition-all duration-500`}
      />

    </div>

  </div>
)}

          <div>
  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-white">
    Confirm Password
  </label>

  <div className="relative">

    <input
      type={
        showConfirmPassword
          ? "text"
          : "password"
      }
      name="confirmPassword"
      value={passwords.confirmPassword}
      onChange={handleChange}
      minLength={8}
      autoComplete="new-password"
      placeholder="Confirm password"
      required
      className="
      w-full
      rounded-xl
      border
      border-slate-300
      bg-white
      px-4
      py-3
      pr-12
      text-gray-800

      shadow-sm

      transition-all
      duration-300

      hover:border-indigo-400

      focus:border-indigo-600
      focus:ring-4
      focus:ring-indigo-300
      focus:outline-none

      dark:border-slate-700
      dark:bg-slate-800
      dark:text-white
      dark:placeholder:text-slate-400
      "
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(
          !showConfirmPassword
        )
      }
      className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-500
      hover:text-indigo-600
      "
    >
      {showConfirmPassword ? (
        <FaEyeSlash />
      ) : (
        <FaEye />
      )}
    </button>

  </div>
</div>

{passwords.confirmPassword && (

  <div className="mt-3">

    {passwords.newPassword ===
    passwords.confirmPassword ? (

      <p className="font-medium text-green-600">

        ✅ Passwords match

      </p>

    ) : (

      <p className="font-medium text-red-500">

        ❌ Passwords do not match

      </p>

    )}

  </div>

)}

          <Button
  type="submit"
  disabled={loading}
>
  {loading
    ? "Updating..."
    : "Reset Password"}
</Button>
        </form>

        <p className="mt-6 text-center">
          <Link
            to="/"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default ResetPassword;