import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { toast } from "react-toastify";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success(response.data.message);

      navigate("/reset-password", {
        state: {
          email,
          otp,
        },
      });
    } catch (error) {
      toast.error(
error.response?.data?.message ||
"Invalid OTP."
);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Verify OTP
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-300">
          Enter the OTP sent to
        </p>

        <p className="font-semibold text-indigo-600">
          {email}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <Input
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            placeholder="Enter 6-digit OTP"
            required
          />

          <Button type="submit">
            Verify OTP
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

export default VerifyOtp;