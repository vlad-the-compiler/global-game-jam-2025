'use client';

const generateStaticParams = () => {};

import React, { useState } from 'react';

const GameComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = (buttonId: string) => {
    alert(`Button ${buttonId} clicked!`);
    // You can replace this with your specific game logic
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gray-100 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold">Jackbox-like Game</h2>

      <div className="w-full">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your answer here..."
          className="w-full p-3 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
  );
};

export default GameComponent;
