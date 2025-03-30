import React, { useEffect, useState } from "react";
import { IoTrashBin } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { showAlert } from "../../utils/sweetAlert";

const Cart = () => {
  const [cartItems, setCartItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        url: "/cart/get-cart-items",
      });
      setCartItems(response?.data.data || null);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const updateQuantity = async (foodId, action) => {
    try {
      const response = await axiosInstance.post("/cart/add-quantity", {
        foodId,
        action,
      });
      toast.success("Quantity updated", {
        style: {
          background: "#334155",
          color: "#fff",
        },
      });
      setCartItems(response?.data.cart);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity", {
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  };

  const removeItem = async (foodId) => {
    try {
      const result = await showAlert("confirmDeletion");
      if (result.isConfirmed) {
        const response = await axiosInstance.delete(
          `cart/delete-cart-items/${foodId}`
        );
        if (response?.data.cart) {
          setCartItems(response.data.cart);
        } else {
          setCartItems(null);
        }
        await showAlert("deletionSuccess");
      }
    } catch (error) {
      console.error(error);
      await showAlert("deletionError");
    }
  };

  const calculateTotal = () => {
    return cartItems?.items.reduce(
      (total, item) => total + item.totalItemPrice,
      0
    );
  };

  const handleProceedToCheckout = () => {
    if (cartItems) {
      navigate("/checkout", { state: { cart: cartItems } });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 transition-all duration-300 hover:shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Your Shopping Cart
          </h1>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
            {cartItems?.items.length || 0} items
          </span>
        </div>

        {!cartItems ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Your cart is empty
            </h3>
            <p className="mt-1 text-gray-500">
              Start adding some delicious items from our menu
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Browse Restaurants
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.items.map((item) => (
              <div
                key={item.foodId._id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100"
              >
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <img
                    src={item.foodId.image}
                    alt={item.foodId.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.foodId.name}
                    </h2>
                    <p className="text-gray-600">₹{item.foodId.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3 bg-white px-3 py-1 rounded-full border border-gray-200">
                    <button
                      onClick={() =>
                        updateQuantity(item.foodId._id, "decrement")
                      }
                      className="text-gray-500 hover:text-amber-600 p-1 transition-colors"
                    >
                      <FiMinus className="h-4 w-4" />
                    </button>
                    <span className="text-gray-800 font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.foodId._id, "increment")
                      }
                      className="text-gray-500 hover:text-amber-600 p-1 transition-colors"
                    >
                      <FiPlus className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-lg font-semibold text-gray-800 w-20 text-right">
                    ₹{item.totalItemPrice}
                  </p>

                  <button
                    onClick={() => removeItem(item.foodId._id)}
                    className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                  >
                    <IoTrashBin className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-800">Subtotal</h3>
                <p className="text-xl font-bold text-gray-900">
                  ₹{calculateTotal()}
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-8">
                Shipping and taxes calculated at checkout
              </p>
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
