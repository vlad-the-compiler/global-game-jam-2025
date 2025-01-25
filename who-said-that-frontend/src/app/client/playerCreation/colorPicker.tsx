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
  colors: string[];
};

const ColorPicker: React.FC<ColorPickerProps> = ({ onSubmit, colors }) => {
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
              className={`w-16 h-16 rounded-full border-4 cursor-pointer shadow-md transition-all ${color} ${
                selectedColor === index ? "border-black scale-110" : "border-gray-300"
              }`}
              // style={{ backgroundColor: color }}
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
