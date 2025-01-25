import React, { useState } from "react";
import { Schoolbell } from "next/font/google";
import { motion } from "framer-motion";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400",
});

type ColorPickerProps = {
  onSubmit: (colorIndex: number) => void;
};

const colors = [
  "#FF5733", // Red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#F3FF33", // Yellow
  "#FF33A8", // Pink
  "#33FFF7", // Cyan
  "#8333FF", // Purple
  "#FF8C33", // Orange
  "#A833FF", // Violet
];

const ColorPicker: React.FC<ColorPickerProps> = ({ onSubmit }) => {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  const handleColorClick = (index: number) => {
    setSelectedColor(index);
  };

  const handleLocalSubmit = () => {
    if (selectedColor !== null) {
      onSubmit(selectedColor);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border-4 space-y-4 max-w-sm w-full">
        <h1 className={`text-2xl ${schoolbell.className} text-gray-700 uppercase`}>
          CHOOSE YOUR COLOR
        </h1>

        {/* Color Grid */}
        <div className="grid grid-cols-3 gap-4">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              onClick={() => handleColorClick(index)}
              className={`w-16 h-16 rounded-xl border-4 cursor-pointer shadow-md transition-all ${
                selectedColor === index ? "border-black scale-110" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleLocalSubmit}
          whileHover={{ scale: selectedColor !== null ? 1.1 : 1 }}
          whileTap={{ scale: selectedColor !== null ? 0.9 : 1 }}
          className={`mt-4 px-6 py-3 text-lg font-bold text-white border-4 rounded-2xl shadow-md transition-all ${
            selectedColor !== null
              ? "bg-blue-600 border-black cursor-pointer"
              : "bg-gray-300 border-gray-400 cursor-not-allowed"
          } ${schoolbell.className}`}
          disabled={selectedColor === null}
        >
          SUBMIT
        </motion.button>
      </div>
    </div>
  );
};

export default ColorPicker;
