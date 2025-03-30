import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ data }) => {
  const isClosed = data.status.toLowerCase() === "closed";

  return (
    <div
      className={`relative max-w-xs w-full bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
        isClosed
          ? "opacity-70 grayscale cursor-not-allowed"
          : "hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-amber-400"
      }`}
    >
      {/* Closed overlay */}
      {isClosed && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
          <span className="px-3 py-1 text-white font-bold bg-gray-800 rounded-full text-sm">
            Currently Closed
          </span>
        </div>
      )}

      {/* Card content */}
      <div className="h-full flex flex-col">
        {isClosed ? (
          <>
            <div className="relative flex-1">
              <img
                className="w-full h-48 object-cover rounded-t-xl"
                src={data.image}
                alt={data.name}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                <h2 className="text-white text-xl font-bold truncate">
                  {data.name}
                </h2>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-amber-100 text-sm">
                    {data.location}
                  </span>
                  <span className="text-red-300 text-xs font-semibold bg-gray-900/80 px-2 py-1 rounded-full">
                    {data.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border-t">
              <p className="text-center text-gray-600 text-sm font-medium">
                {data.cuisine}
              </p>
            </div>
          </>
        ) : (
          <Link
            to={`/restaurantPage/${data?._id}`}
            className="h-full flex flex-col"
          >
            <div className="relative flex-1">
              <img
                className="w-full h-48 object-cover rounded-t-xl"
                src={data.image}
                alt={data.name}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                <h2 className="text-white text-xl font-bold truncate">
                  {data.name}
                </h2>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-amber-100 text-sm">
                    {data.location}
                  </span>
                  <span className="text-green-300 text-xs font-semibold bg-gray-900/80 px-2 py-1 rounded-full">
                    {data.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border-t">
              <p className="text-center text-gray-600 text-sm font-medium">
                {data.cuisine}
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
