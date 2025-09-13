import { useState } from "react";
import { Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6"; // Updated import
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

// ... rest of your component code remains the same

const navigation = [
  { name: "Home", href: "/home", key: "home" },
  // { name: "Restaurants", href: "/all-restaurant", key: "restaurants" },
  { name: "About Us", href: "/about", key: "about" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userLogout = async () => {
    try {
      await axiosInstance.post("user/logout");
      toast.success("Logged out successfully");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-gray-800 shadow-xl border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Logo and desktop navigation */}
          <div className="flex flex-1 items-center justify-start">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white tracking-tighter">
                <span className="text-amber-400">FOOD</span>
                <span className="text-white">EAT</span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden sm:ml-8 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-1 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:-translate-y-0.5 relative"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-gray-800"></span>
            </button>

            <Link
              to="/cart"
              className="p-1 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:-translate-y-0.5 relative"
            >
              <FaCartShopping className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-gray-800"></span>
            </Link>

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex rounded-full text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:-translate-y-0.5">
                <span className="sr-only">Open user menu</span>
                <FaUserCircle className="h-7 w-7" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-gray-700 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={classNames(
                        active ? "bg-gray-700" : "",
                        "block px-4 py-2 text-sm text-gray-300"
                      )}
                    >
                      Your Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/orders"
                      className={classNames(
                        active ? "bg-gray-700" : "",
                        "block px-4 py-2 text-sm text-gray-300"
                      )}
                    >
                      Your Orders
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={userLogout}
                      className={classNames(
                        active ? "bg-gray-700" : "",
                        "block w-full px-4 py-2 text-sm text-gray-300 text-left"
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-700">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-3 py-2 mt-1 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Your Orders
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default UserHeader;



