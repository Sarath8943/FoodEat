import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-white border border-gray-200 shadow-xl rounded-3xl max-w-xl w-full px-10 py-14 text-center relative overflow-hidden">
        
        {/* Optional Soft Background Shape */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 rounded-full blur-3xl opacity-30 z-[-1]"></div>

        {/* Animated Emoji */}
        <div className="text-[4rem] mb-4 animate-bounce">🚫</div>

        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg rounded-full shadow-lg hover:from-pink-500 hover:to-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <span className="mr-2">🏠</span>
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
