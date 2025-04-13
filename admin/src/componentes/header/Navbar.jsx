import React from "react";
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from "../../config/axiosInstance";
import { FiLogOut, FiSettings, FiUser, FiBell } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import img1 from "../../assets/logo/profile.avif";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userLogout = async () => {
    try {
      await axiosInstance({
        method: "POST",
        url: "user/logout",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40">
      <div className="flex items-center justify-end h-full px-6">
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          {/* <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <FiBell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> */}

          {/* User Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="relative">
                <img
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                  src={img1}
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                Admin
              </span>
              <IoIosArrowDown className="w-4 h-4 text-gray-500 transition-transform group-hover:rotate-180" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
              <div className="py-1">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiUser className="mr-3 w-4 h-4 text-gray-500" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiSettings className="mr-3 w-4 h-4 text-gray-500" />
                  Settings
                </a>
                <button
                  onClick={userLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiLogOut className="mr-3 w-4 h-4 text-gray-500" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
