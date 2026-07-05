import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

import Button from "../components/common/Button";
import Input from "../components/common/Input";

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
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
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

      alert(response.data.message);

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

      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create Account
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-300">
          Register to manage your tasks.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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

          <Button type="submit">
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-slate-300">
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