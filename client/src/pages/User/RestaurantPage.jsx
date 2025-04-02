import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductSkelton } from "../../components/shared/Skelton";
import MenuCard from "../../components/user/MenuCard";
import { FiClock, FiMapPin, FiPhone, FiStar } from "react-icons/fi";
import ReviewPage from "../../pages/User/ReviewPage";

const RestaurantPage = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchRestaurantDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        url: `/restaurant/${id}`,
      });

      setRestaurantDetails(response?.data);
      setMenuItems(response.data.menuItems);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-20 container mx-auto px-4">
        <ProductSkelton />
      </div>
    );
  }

  return (
    <div className="mt-20 container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Restaurant Hero Section */}
      <div className="relative bg-gray-800 rounded-xl overflow-hidden mb-8 h-64">
        <img
          src={restaurantDetails.image}
          alt={restaurantDetails.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {restaurantDetails.name}
            </h1>
            <p className="text-amber-300 mt-1">{restaurantDetails.cuisine}</p>
          </div>
        </div>
      </div>

      {/* Restaurant Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Main Info */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  restaurantDetails.status === "Open"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {restaurantDetails.status}
              </span>
              <div className="flex items-center text-amber-500">
                <FiStar className="fill-current mr-1" />
                <span className="font-medium">4.5 (120 reviews)</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              {restaurantDetails.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-500 text-sm">Address</h3>
                  <p className="text-gray-800">{restaurantDetails.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-500 text-sm">Opening Hours</h3>
                  <p className="text-gray-800">10:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-gray-500 text-sm">Contact</h3>
                  <p className="text-gray-800">+91 9876543210</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to={``} className="block">
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
              Order Online
            </button>
          </Link>
          <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
            View Menu
          </button>
          <Link to={`review/${id}`}>
            <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
              Write a Review
            </button>
          </Link>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recommended Menu</h2>
          <div className="flex gap-2">
            {/* <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              All
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Starters
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Mains
            </button> */}
          </div>
        </div>

        {menuItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <MenuCard menucard={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No menu items available
            </h3>
            <p className="text-gray-500">
              Check back later or browse other restaurants
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;