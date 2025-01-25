import React, { useState } from "react";
import { Schoolbell } from "next/font/google";

// Load Schoolbell font with default weight (400)
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400", // Default weight, you can adjust this if needed
});

const BottomButtons: React.FC = () => {
  const handleButtonClick = (buttonId: string) => {
    alert(`Button ${buttonId} clicked!`);
    // You can replace this with your specific game logic
  };

  return (
    <div className="fixed bottom-10 w-full px-6">
      <div className="grid grid-cols-2 gap-4 w-full">
        {["1", "2"].map(buttonId => (
          <button
            key={buttonId}
            onClick={() => handleButtonClick(buttonId)}
            className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Button {buttonId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomButtons;
