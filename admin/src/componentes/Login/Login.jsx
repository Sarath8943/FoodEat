import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      toast.success("Logged in successfully!");
      navigate("/home");
      window.location.reload();
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-center text-gray-600">
          Don’t have an account?{" "}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
