import React, { useEffect, useState } from "react";

const Home = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const newUser = queryParams.get("newUser");

    if (newUser) {
      setWelcomeMessage(
        "Thank you for signing up! Start exploring our delicious meals."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-200 flex flex-col items-center justify-center px-4">
      {/* Welcome Message for New Users */}
      {welcomeMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4 text-center">
          {welcomeMessage}
        </div>
      )}

      {/* Welcome Text */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-4">
        Welcome to <br />
        <span className="text-orange-600">FOOD EAT HOME</span>
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 text-center max-w-xl mb-6">
        Delicious meals delivered straight to your door. Fresh, fast, and
        flavorful. Order your favorites now!
      </p>
    </div>
  );
};

export default Home;
