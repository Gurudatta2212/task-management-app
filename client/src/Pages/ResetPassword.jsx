import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      passwords.newPassword !==
      passwords.confirmPassword
    ) {
      toast.warning("Passwords do not match.");
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

      navigate("/");
    } catch (error) {
      toast.error(
error.response?.data?.message ||
"Failed to reset password."
);
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
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />

          <Button type="submit">
            Reset Password
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