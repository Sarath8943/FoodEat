import React from "react";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

function Orders({ lastThreeOrders }) {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
        <Link
          to="/order"
          className="text-amber-600 hover:text-amber-700 text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {lastThreeOrders?.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {lastThreeOrders.map((order) => (
              <li
                key={order._id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <FiPackage className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {order.restaurant?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Order #: {order._id.substring(0, 8)}...
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

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-2 text-gray-400" />
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiDollarSign className="mr-2 text-gray-400" />₹
                    {order.finalPrice.toFixed(2)}
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <Link
                    to={`/order/${order._id}`}
                    className="text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    View Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto h-16 w-16 text-gray-400">
              <FiPackage className="w-full h-full" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your recent orders will appear here
            </p>
            <div className="mt-6">
              <Link
                to="/home"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700"
              >
                Order Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
