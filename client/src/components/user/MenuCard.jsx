import React from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { FiPlus, FiStar } from "react-icons/fi";

const MenuCard = ({ menucard }) => {
  const onSubmit = async () => {
    try {
      const response = await axiosInstance.post("cart/add-to-cart", {
        foodId: menucard._id,
        restaurantId: menucard.restaurant,
        quantity: 1,
      });
      toast.success("Added to cart!", {
        icon: "🛒",
        style: {
          borderRadius: "10px",
          background: "#334155",
          color: "#fff",
        },
      });
      console.log("response===", response);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        style: {
          borderRadius: "10px",
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden group">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={menucard.image}
          alt={menucard.name}
          loading="lazy"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span className="text-sm font-semibold text-amber-600">4.5</span>
          <FiStar className="h-3.5 w-3.5 text-amber-400 fill-current" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Name and Description */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-1.5 line-clamp-1">
            {menucard.name}
          </h2>
          <p className="text-gray-500 text-sm line-clamp-2">
            {menucard.description}
          </p>
        </div>

        {/* Price and Add to Cart Button */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ₹{menucard.price.toLocaleString()}
            </p>
            {menucard.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                ₹{menucard.originalPrice.toLocaleString()}
              </p>
            )}
          </div>
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <FiPlus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
