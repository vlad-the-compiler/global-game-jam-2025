import React, { useState } from "react";
import { Schoolbell } from "next/font/google";

// Load Schoolbell font with default weight (400)
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400", // Default weight, you can adjust this if needed
});

// Sample SVG logo placeholder (you can replace this with your actual SVG)
const Logo = () => (
  <>
    <div className="absolute bg-blue-400 rounded-full h-16 w-16 md:h-24 md:w-24 lg:h-36 lg:w-36" />
    <img
      src="/logo-mock.png"
      alt="Game Logo"
      className="relative h-20 w-20 md:h-24 md:w-24 lg:h-40 lg:w-40 object-cover z-10"
    />
  </>
);

const Header: React.FC = () => {
  const handleCornerButtonClick = (buttonType: string) => {
    alert(`${buttonType} button clicked!`);
    // You can replace this with your specific game logic
  };

  return (
    <div className="absolute mt-2 top-0 w-full flex justify-center p-6">
      <Logo />
    </div>
  );
};

export default Header;
