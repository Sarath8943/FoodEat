
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-200 flex flex-col items-center justify-center px-4">
      
      {/* Welcome Text */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-4">
        Welcome to <br />
        <span className="text-orange-600">FOOD EAT HOME</span>
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 text-center max-w-xl mb-6">
        Delicious meals delivered straight to your door. Fresh, fast, and flavorful. Order your favorites now!
      </p>
    </div>
  );
};

export default Home;



