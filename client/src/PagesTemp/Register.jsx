import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Register Clicked");
    console.log(formData);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.warning("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {
  toast.warning(
    "Please enter a valid email address."
  );
  return;
}

    try {
      console.log("Calling Register API...");

      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("SUCCESS:", response.data);

      toast.success(
  "Account created successfully! Keep access to this email for password recovery."
);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/");
    } catch (error) {
      console.error("FULL ERROR:", error);
      console.error("RESPONSE:", error.response);
      console.error("DATA:", error.response?.data);

     toast.error(
error.response?.data?.message ||
error.message
);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-3 py-6 dark:bg-slate-950">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create Account
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-300">
          Register to manage your tasks.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
  <p className="text-xs leading-5 text-amber-700 dark:text-amber-300">
    ⚠️ Use an email you own. You'll need it to reset your password.
  </p>
</div>

<div className="mt-5">
  <Button type="submit">
    Register
  </Button>
</div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-slate-300">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;