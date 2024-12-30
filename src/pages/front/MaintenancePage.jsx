// Import React and necessary libraries
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-200 via-green-100 to-green-50 text-gray-800">
      {/* Header with Logo */}
      <header className="mb-8 text-center">
        <img
          src="https://africafoodgeneral.com/assets/AFfOOD-CkpeDnN-.png" // Replace with your logo path
          alt="Africa Food General Logo"
          className="w-32 h-auto mx-auto drop-shadow-lg"
        />
        <h1 className="text-3xl font-extrabold mt-4 text-green-900">Africa Food General</h1>
        <p className="text-lg mt-2 text-green-700">Bringing Africa to Your Doorstep</p>
      </header>

      {/* Main Content */}
      <main className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-green-800">We'll Be Right Back!</h2>
        <p className="text-lg mb-6 text-gray-700">
          We are currently performing maintenance to enhance your shopping experience.
          Please check back soon!
        </p>


        {/* Progress Animation */}
        <div className="relative w-64 h-3 bg-green-300 rounded-full overflow-hidden mx-auto">
          <div className="absolute left-0 top-0 h-full bg-green-600 animate-pulse w-1/2"></div>
        </div>
      </main>

      {/* Footer */}
      <div className="mt-6 text-center text-gray-600">
        <p>© 2024 Africa Food General. All rights reserved.</p>
      </div>
    </div>
  );
};

export default MaintenancePage;
