
import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiX, FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.request({
        method: "POST",
        url: "/user/login",
        data,
      });
      toast.success("Login successful", {
        style: {
          background: "#334155",
          color: "#fff",
        },
      });
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);
      window.location.href = "/home"; // Redirect to home page
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/home">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-gray-900 tracking-tighter">
                <span className="text-amber-400">FOOD</span>
                <span className="text-gray-800">EAT</span>
              </span>
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Login to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "Email is required" })}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // 👈 toggle here
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <FiLogIn className="h-5 w-5" />
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
