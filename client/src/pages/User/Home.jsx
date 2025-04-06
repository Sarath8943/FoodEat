import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Data from "../../../src/data/data";
import SimpleSlider from "../../components/slider/slider";
import RestaurantCard from "../../components/user/RestaurantCard";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";



const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [restaurants, isLoading, error] = useFetch("/restaurant/", {
    cuisine: selectedCuisine !== "all" ? selectedCuisine : undefined,
  });
  const navigate = useNavigate();
  
  
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRestaurantClick = (id) => {
    navigate(`/restaurantPage/${id}`);
  };

  const filteredRestaurants = restaurants?.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Search Section */}
      <div className="bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Discover the best food near you
          </h1>
          <div className="relative">
            <input
              type="text"
              className="w-full py-4 px-6 rounded-full border-0 focus:ring-2 focus:ring-amber-400 shadow-lg"
              placeholder="Search for restaurants, cuisine, or dishes..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <CiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500" />

            {searchQuery && (
              <div className="absolute bg-white w-full mt-2 p-4 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                <h2 className="font-bold text-lg mb-3 text-gray-800">
                  Search Results
                </h2>
                {filteredRestaurants?.length ? (
                  <div className="space-y-2">
                    {filteredRestaurants.map((item) => (
                      <div
                        key={item._id}
                        className="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                       
                      > onClick={() => handleRestaurantClick(item._id)}
                        <p className="text-gray-700 font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.cuisine}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No restaurants found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Dishes Slider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl mb-2">
            Order our best food options
          </h2>
          <p className="text-gray-600">
            Discover our most popular dishes and special offers
          </p>
        </div>
        <SimpleSlider data={Data} />
      </div>

      {/* Restaurants Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-t-3xl -mt-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl mb-1">
              Featured Restaurants
            </h2>
            <p className="text-gray-600">
              {restaurants?.length} restaurants available
            </p>
          </div>
          <select
            className="bg-gray-100 border-0 rounded-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-amber-400"
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
          >
            <option value="indian">Indian</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            Error loading restaurants: {error.message}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants?.map((item) => (
              <RestaurantCard
                data={item}
                key={item._id}
                onClick={() => handleRestaurantClick(item._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
