import React from "react";
import { FiClock, FiStar, FiTruck, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-amber-400">FOOD</span>EAT
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Order delicious food from your favorite restaurants with just a few
            taps
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/home"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              Order Now
            </Link>
            <Link
              to="/home"
              className="px-8 py-3 bg-white text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Restaurants
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose <span className="text-amber-500">FOOD EAT</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="text-amber-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your food delivered in under 30 minutes
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="text-amber-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Only the best restaurants in your area
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-amber-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Coverage</h3>
              <p className="text-gray-600">Serving your entire city</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="text-amber-500 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">100% safe transactions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
