import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(response.data.message);

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (error) {
      toast.error(
error.response?.data?.message ||
"Failed to send OTP."
);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Forgot Password
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-300">
          Enter your registered email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            required
          />

          <Button type="submit">
            Send OTP
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

export default ForgotPassword;