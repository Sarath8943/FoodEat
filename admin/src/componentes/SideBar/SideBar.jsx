



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChefHat,
  Home,
  Salad,
  ShoppingCart,
  Tag,
  Menu,
  X
} from "lucide-react";
import { FaUsers } from "react-icons/fa";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      path: "/home",
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      path: "/allrestaurants",
      label: "Restaurants",
      icon: <ChefHat className="w-5 h-5" />,
    },
    {
      path: "/all-restaurants",
      label: "Menu Items",
      icon: <Salad className="w-5 h-5" />,
    },
    {
      path: "/coupons",
      label: "Coupons",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      path: "/restaurantsOrders",
      label: "Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      path: "/payments",
      label: "Payments",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      path: "/users",
      label: "Users",
      icon: <FaUsers className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 rounded-lg text-white shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="text-2xl font-bold text-indigo-600 flex items-center justify-center">
              <span className="bg-indigo-100 p-2 rounded-lg mr-2">
                <ChefHat className="w-6 h-6 text-indigo-600" />
              </span>
              Admin
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      location.pathname === item.path
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className={`mr-3 ${
                      location.pathname === item.path 
                        ? "text-indigo-500" 
                        : "text-gray-500"
                    }`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {location.pathname === item.path && (
                      <span className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">AD</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Admin</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 md:ml-64"></div>
    </>
  );
}

export default SideBar;




