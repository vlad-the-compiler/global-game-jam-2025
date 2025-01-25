import React, { useState } from "react";
import { Schoolbell } from "next/font/google";
import { motion } from "framer-motion";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400",
});

type NamePickerProps = {
  onSubmit: (playerName: string) => void;
};

const NamePicker: React.FC<NamePickerProps> = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState<string>("");
  const maxNameLength = 20; // Limit the name length

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  const handleLocalSubmit = () => {
    if (playerName.trim() !== "") {
      onSubmit(playerName);
      setPlayerName(""); // Reset input field
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLocalSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border-4 space-y-4 max-w-sm w-full">
        <h1 className={`text-2xl ${schoolbell.className} text-gray-700 uppercase`}>
          PICK YOUR NAME
        </h1>
        <input
          type="text"
          value={playerName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={maxNameLength}
          placeholder="Choose Your Name"
          className={`w-full p-4 text-lg border-4 border-black text-black rounded-2xl shadow-md focus:outline-none ${schoolbell.className} uppercase`}
        />
        <div className="text-sm text-gray-500">
          {playerName.length}/{maxNameLength}
        </div>
        {/* Submit Button */}
        <motion.button
          onClick={handleLocalSubmit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, rotate: [0, 5, -5, 5, -5, 0] }}
          className={`mt-4 px-6 py-3 text-lg font-bold text-white bg-blue-600 border-4 border-black rounded-2xl shadow-md ${schoolbell.className}`}
          animate={{
            rotate: [0.4, 1.3, -0.8, 1.6, -1.2, 1.8, -0.5, 0.9, -1.4, 0.6, 0.4], // Jiggle animation
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: 2 * 0.1, // Stagger for randomness
          }}
        >
          SUBMIT
        </motion.button>
      </div>
    </div>
  );
};

export default NamePicker;
