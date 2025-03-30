import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div className="relative w-48 h-48 rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      {/* Image with zoom effect */}
      <img
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        src={data.image}
        alt={data.name || "Card image"}
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <h3 className="text-xl font-bold truncate transition-transform duration-300 group-hover:-translate-y-1">
          {data.name}
        </h3>
        {data.description && (
          <p className="text-sm opacity-0 max-h-0 group-hover:opacity-80 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
            {data.description}
          </p>
        )}
      </div>

      {/* Optional badge */}
      {data.badge && (
        <span className="absolute top-3 right-3 bg-amber-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
          {data.badge}
        </span>
      )}
    </div>
  );
};

export default Card;
