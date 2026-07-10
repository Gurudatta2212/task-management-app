import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import Button from "../components/common/Button";


function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [seconds, setSeconds] = useState(60);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] =
  useState(false);

  const email = location.state?.email || "";
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
  if (!/^\d?$/.test(value)) return;

  const updatedOtp = [...otp];
  updatedOtp[index] = value;

  setOtp(updatedOtp);

  const otpValue = updatedOtp.join("");

  if (value && index < 5) {
   inputRefs.current[index + 1]?.focus();
}

  if (otpValue.length === 6) {
   verifyOtpAutomatically(otpValue);
 }
};

  const handleKeyDown = (e, index) => {
  if (
    e.key === "Backspace" &&
    otp[index] === "" &&
    index > 0
  ) {
    inputRefs.current[index - 1]?.focus();
  }
};

  const handlePaste = (e) => {
  e.preventDefault();

  const pasted = e.clipboardData
    .getData("text")
    .trim();

  if (!/^\d{6}$/.test(pasted)) return;

  const values = pasted.split("");

  setOtp(values);

  values.forEach((digit, index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].value = digit;
    }
  });

  inputRefs.current[5]?.focus();
  verifyOtpAutomatically(values.join(""));
};

useEffect(() => {
  if (seconds <= 0) return;

  const timer = setInterval(() => {
    setSeconds((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [seconds]);

useEffect(() => {
  inputRefs.current[0]?.focus();
}, []);

const verifyOtpAutomatically = async (otpValue) => {
  if (verifyLoading) return;

  setVerifyLoading(true);

  try {
    const response = await api.post(
      "/auth/verify-otp",
      {
        email,
        otp: otpValue,
      }
    );

    toast.success(response.data.message);

    navigate("/reset-password", {
      state: {
        email,
        otp: otpValue,
      },
    });
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Invalid OTP."
    );
  } finally {
    setVerifyLoading(false);
  }
};

  const handleSubmit = (e) => {
  e.preventDefault();

  verifyOtpAutomatically(
    otp.join("")
  );
};

  const handleResendOtp = async () => {
  try {
    setLoading(true);

    const response = await api.post(
      "/auth/resend-otp",
      { email }
    );

    toast.success(response.data.message);

    setSeconds(60);
    setOtp(new Array(6).fill(""));

inputRefs.current.forEach((input) => {
  if (input) input.value = "";
});

inputRefs.current[0]?.focus();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to resend OTP."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Verify Your Email
        </h1>

        <p className="mt-2 text-center text-gray-500 dark:text-slate-300">
  We've sent a verification code to
</p>

<p className="mt-1 text-center font-semibold text-indigo-600 break-all">
  {email}
</p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
  <label className="mb-5 block text-center text-sm font-semibold text-gray-700 dark:text-white">
    Enter Verification Code
  </label>

  <div className="flex justify-center gap-2">
    {otp.map((digit, index) => (
      <input
        key={index}
        ref={(el) => (inputRefs.current[index] = el)}
        type="tel"
        inputMode="numeric"
        maxLength={1}
        value={digit}
        onChange={(e) =>
          handleChange(
            e.target.value,
            index
          )
        }
        onKeyDown={(e) =>
          handleKeyDown(e, index)
        }
        onPaste={handlePaste}
        className="
        h-14
w-14
rounded-2xl
border-2
border-slate-300
bg-white
text-center
text-2xl
font-bold
tracking-widest
selection:bg-transparent
shadow-md
transition-all
duration-300

hover:scale-105
hover:-translate-y-1
hover:border-indigo-500
hover:shadow-xl

focus:scale-110
focus:border-indigo-600
focus:ring-4
focus:ring-indigo-300
focus:shadow-[0_0_25px_rgba(99,102,241,0.7)]
focus:outline-none

caret-indigo-500

dark:border-slate-700
dark:bg-slate-800
dark:text-white
dark:focus:ring-indigo-700"
      />
    ))}
  </div>
</div>

<div className="mt-6 text-center">

  {seconds > 0 ? (
    <p className="text-sm text-gray-500 dark:text-slate-400">
      Resend OTP in{" "}
      <span className="font-bold text-indigo-600">
  {String(Math.floor(seconds / 60)).padStart(2, "0")}:
  {String(seconds % 60).padStart(2, "0")}
</span>
    </p>
  ) : (
    <button
      type="button"
      disabled={loading}
      onClick={handleResendOtp}

      className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
    >
      {loading
        ? "Sending..."
        : "Resend OTP"}
    </button>
  )}

</div>

          <Button
  type="submit"
  disabled={
    verifyLoading ||
    otp.join("").length !== 6
  }
>
  {verifyLoading
    ? "Verifying..."
    : "Verify Code"}
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