'use client';

import React, { useState } from 'react';
import { Schoolbell } from 'next/font/google';  // Import the Schoolbell font

// Load Schoolbell font with default weight (400)
const schoolbell = Schoolbell({
  subsets: ['latin'],
  weight: '400', // Default weight, you can adjust this if needed
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

const GameComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const maxLength = 100;

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value.toUpperCase()); // Automatically convert to uppercase
  };

  const handleButtonClick = (buttonId: string) => {
    alert(`Button ${buttonId} clicked!`);
    // You can replace this with your specific game logic
  };

  // Determine the color based on the input length
  const getTextColor = () => {
    if (inputText.length > 90) return 'text-red-500';  // Red for above 90
    if (inputText.length > 70) return 'text-yellow-500';  // Yellow/Orange for above 70
    return 'text-black';  // Default color
  };

  // Character count
  const characterCount = inputText.length;

  return (
    <>
      <div className="flex flex-col items-center space-y-6 p-6 bg-gray-100 rounded-lg shadow-lg max-w-sm mx-auto">
        {/* SVG Logo Placeholder */}
        <Logo />

        {/* Wrapper for the Dialog Bubble with Floating Animation */}
        <div className="relative w-full animate-float">
          {/* Dialog Bubble (Comic Book Style) */}
          <div
            className={`relative w-full bg-white p-4 rounded-xl shadow-md border-4 border-black ${schoolbell.className} text-lg uppercase animate-jiggle`}
          >
            <div className="absolute top-[-10px] left-[-20px] w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-white"></div>
            <div className="text-left text-gray-700">PREVIOUS DIALOGUE LINE</div>
          </div>
        </div>

        {/* Textarea Input */}
        <div className="w-full relative">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="TYPE YOUR ANSWER HERE..."
            maxLength={maxLength}  // Limit input to 100 characters
            rows={4}  // Make the height of the textarea twice as tall
            className={`w-full p-3 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-auto ${schoolbell.className} ${getTextColor()}`}
          />
          {/* Character Counter */}
          <div className="absolute bottom-0 right-0 p-2 text-sm text-gray-500">
            {characterCount}/{maxLength}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {['1', '2', '3', '4'].map((buttonId) => (
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
    </>
  );
};

export default GameComponent;
