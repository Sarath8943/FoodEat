import React from "react";
import { Link } from "react-router-dom";
import { FiClock, FiStar, FiTruck, FiHeart, FiShield } from "react-icons/fi";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-24 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          About FOOD EAT
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Discover how we bring delicious food to your doorstep with just a few
          clicks!
        </p>
      </div>

      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
            <span className="bg-amber-400 w-4 h-4 rounded-full mr-3"></span>
            Our Story
          </h2>
          <p className="text-gray-600 leading-7 text-lg">
            At <span className="font-bold text-gray-800">FOOD EAT</span>, we
            believe that good food can create unforgettable moments. Founded in
            2024, we started with a simple mission: to make quality meals
            accessible to everyone. Whether it's a cozy dinner at home or a
            celebration with friends, we deliver a variety of dishes right to
            your doorstep.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="bg-gray-800 text-white rounded-xl p-8 md:p-12 h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 text-amber-400">
                FOOD EAT
              </h2>
              <p className="text-xl">Delivering happiness one meal at a time</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 border border-gray-200 h-full">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="bg-amber-400 w-4 h-4 rounded-full mr-3"></span>
              Our Mission
            </h2>
            <p className="text-gray-600 leading-7 text-lg">
              We aim to provide a seamless and satisfying food delivery
              experience for everyone. Partnering with the best local
              restaurants, we ensure every meal is fresh, delicious, and
              delivered on time. From traditional cuisines to exotic flavors, we
              bring the world of food to your fingertips.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose FOOD EAT?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to making your food experience exceptional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiStar className="text-amber-500 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Premium Selection
            </h3>
            <p className="text-gray-600">
              Curated restaurants with top-rated dishes
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiClock className="text-amber-500 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Average delivery time under 30 minutes
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiShield className="text-amber-500 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Secure Payments
            </h3>
            <p className="text-gray-600">100% secure payment options</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FiHeart className="text-amber-500 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Customer Love
            </h3>
            <p className="text-gray-600">95% customer satisfaction rate</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-800 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-6">
            Ready to experience the joy of great food?
          </h2>
          <Link
            to="/all-restuarant"
            className="inline-block mt-6 px-8 py-3 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-500 transition duration-300 text-lg"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
