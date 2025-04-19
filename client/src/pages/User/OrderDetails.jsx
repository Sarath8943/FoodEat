import React, { useState } from "react";
import useFetch from "../../hooks/UseFetch";
import {
  FiPackage,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const OrderDetails = () => {
  const [orderData, loading, errors] = useFetch("/order/get-all-order");
  const orders = orderData?.orders;
  console.log("gdggg",orders);
  const orderId = localStorage.setItem("orderId", orders?.id);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the index range for the current page
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-amber-100 text-amber-800";
      case "delivered":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (errors) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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
                Error loading orders: {errors.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil((orders?.length || 0) / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Order History
          </h1>
          <p className="text-gray-600">View and track all your past orders</p>
        </div>

        {orders && orders.length > 0 ? (
          <>
            <div className="space-y-6">
              {currentOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-amber-50 rounded-lg">
                          <FiPackage className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <h2 className="font-medium text-gray-800">
                            Order #{order._id.substring(0, 8)}...
                          </h2>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <FiMapPin className="mr-2 text-gray-400" />
                          <span className="text-sm">
                            {order.restaurant?.name ||
                              "Restaurant not available"}
                          </span>
                        </div>
                        <div className="flex items-start text-gray-600">
                          <FiMapPin className="mr-2 text-gray-400 mt-0.5" />
                          <span className="text-sm">
                            {order.deliveryAddress
                              ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}`
                              : "No address provided"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <FiClock className="mr-2 text-gray-400" />
                          <span className="text-sm">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FiDollarSign className="mr-2 text-gray-400" />
                          <span className="text-sm">
                            ₹{order.finalPrice.toFixed(2)} (₹
                            {order.totalAmount.toFixed(2)} before discount)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">
                        Order Items
                      </h3>
                      <ul className="space-y-2">
                        {order.cartId?.items?.map((item) => (
                          <li
                            key={item._id}
                            className="flex justify-between text-sm text-gray-600"
                          >
                            <span>
                              {item.quantity} × {item.foodId?.name}
                            </span>
                            <span className="font-medium">
                              ₹{item.totalItemPrice.toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 mx-1 rounded-lg ${
                    currentPage === 1
                      ? "text-gray-400"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 mx-1 rounded-lg font-medium ${
                      currentPage === index + 1
                        ? "bg-amber-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 mx-1 rounded-lg ${
                    currentPage === totalPages
                      ? "text-gray-400"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 text-gray-400">
              <FiPackage className="w-full h-full" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-gray-500">
              Your order history will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
