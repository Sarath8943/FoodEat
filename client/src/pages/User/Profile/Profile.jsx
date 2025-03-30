import React, { useState } from "react";
import {
  FaUser,
  FaListAlt,
  FaAddressCard,
  FaChevronRight,
} from "react-icons/fa";
import useFetch from "../../../hooks/UseFetch";
import SavedAddresses from "./SavedAdress";
import Orders from "./Orders";
import Account from "./Account";

const ProfilePage = () => {
  const [profile, isLoading, error, fetchData] = useFetch("/user/profile");
  const [orders, ordersLoading, ordersError] = useFetch("/order/get-all-order");
  const [activeSection, setActiveSection] = useState("profile");

  if (isLoading || ordersLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || ordersError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading data: {error?.message || ordersError?.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const lastThreeOrders = orders?.orders?.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-gray-800">
                <h2 className="text-lg font-semibold text-white">My Account</h2>
              </div>
              <nav className="space-y-1 p-2">
                <button
                  onClick={() => setActiveSection("profile")}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === "profile"
                      ? "bg-amber-50 text-amber-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <FaUser
                      className={`mr-3 ${
                        activeSection === "profile"
                          ? "text-amber-500"
                          : "text-gray-500"
                      }`}
                    />
                    <span>Profile</span>
                  </div>
                  <FaChevronRight className="text-gray-400" />
                </button>

                <button
                  onClick={() => setActiveSection("orders")}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === "orders"
                      ? "bg-amber-50 text-amber-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <FaListAlt
                      className={`mr-3 ${
                        activeSection === "orders"
                          ? "text-amber-500"
                          : "text-gray-500"
                      }`}
                    />
                    <span>My Orders</span>
                  </div>
                  <FaChevronRight className="text-gray-400" />
                </button>

                <button
                  onClick={() => setActiveSection("addresses")}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                    activeSection === "addresses"
                      ? "bg-amber-50 text-amber-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <FaAddressCard
                      className={`mr-3 ${
                        activeSection === "addresses"
                          ? "text-amber-500"
                          : "text-gray-500"
                      }`}
                    />
                    <span>Saved Addresses</span>
                  </div>
                  <FaChevronRight className="text-gray-400" />
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              {activeSection === "profile" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                      Profile Information
                    </h2>
                    <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
                  </div>
                  <Account profile={profile} />
                </div>
              )}

              {activeSection === "orders" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                      Recent Orders
                    </h2>
                    <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
                  </div>
                  <Orders lastThreeOrders={lastThreeOrders} />
                </div>
              )}

              {activeSection === "addresses" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                      Saved Addresses
                    </h2>
                    <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
                  </div>
                  <SavedAddresses
                    addresses={profile.data.addresses}
                    fetchData={fetchData}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
