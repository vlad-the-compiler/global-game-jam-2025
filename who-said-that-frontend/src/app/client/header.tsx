import React, { useState } from "react";
import { Schoolbell } from "next/font/google";

// Load Schoolbell font with default weight (400)
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400", // Default weight, you can adjust this if needed
});

// Sample SVG logo placeholder (you can replace this with your actual SVG)
const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
    className="mb-6"
  >
    <circle cx="50" cy="50" r="45" fill="#4B8B3B" />
    <text x="50" y="55" fontSize="20" textAnchor="middle" fill="white">
      Logo
    </text>
  </svg>
);

const Header: React.FC = () => {
  const handleCornerButtonClick = (buttonType: string) => {
    alert(`${buttonType} button clicked!`);
    // You can replace this with your specific game logic
  };

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between p-6">
      {/* Corner buttons */}
      <button
        onClick={() => handleCornerButtonClick("Options")}
        className="w-12 h-12 flex items-center justify-center text-xl font-bold bg-gray-800 text-white rounded-full"
      >
        ☰
      </button>
      <Logo />
      <button
        onClick={() => handleCornerButtonClick("Quit")}
        className="w-12 h-12 flex items-center justify-center text-xl font-bold bg-red-600 text-white rounded-full"
      >
        ✖
      </button>
    </div>
  );
};

export default Header;
