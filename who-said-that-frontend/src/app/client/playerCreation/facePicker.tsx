import React, { useState } from "react";
import { Schoolbell } from "next/font/google";
import { motion } from "framer-motion";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400",
});

type PicturePickerProps = {
  onSubmit: (pictureIndex: number) => void;
  color: string;
};

const pictures = [
  "/face-0.png",
  "/face-1.png",
  "/face-2.png",
  "/face-3.png",
  "/face-4.png",
  "/face-5.png",
  "/face-6.png",
  "/face-7.png",
  "/face-8.png",
];

const FacePicker: React.FC<PicturePickerProps> = ({ onSubmit, color }) => {
  const [selectedPicture, setSelectedPicture] = useState<number | null>(null);

  console.log(color);

  const handlePictureClick = (index: number) => {
    setSelectedPicture(index);
  };

  const handleLocalSubmit = () => {
    if (selectedPicture !== null) {
      onSubmit(selectedPicture);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border-4 space-y-4 max-w-sm w-full">
        <h1 className={`text-2xl ${schoolbell.className} text-gray-700 uppercase`}>
          CHOOSE YOUR FACE
        </h1>

        {/* Picture Grid */}
        <div className="grid grid-cols-3 gap-4 overflow-visible">
          {pictures.map((picture, index) => (
            <motion.div
              key={index}
              onClick={() => handlePictureClick(index)}
              className={`w-16 h-16 rounded-full border-4 cursor-pointer shadow-md transition-all overflow-visible ${color} ${
                selectedPicture === index ? "border-black scale-110" : "border-gray-300"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={picture}
                  alt={`Placeholder ${index + 1}`}
                  className="w-[160%] h-[160%] object-cover z-10"
                />
                <img src="character-base.png" className="absolute w-[160%] h-[160%] object-cover z-0" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleLocalSubmit}
          whileHover={{ scale: selectedPicture !== null ? 1.1 : 1 }}
          whileTap={{ scale: selectedPicture !== null ? 0.9 : 1 }}
          className={`mt-4 px-6 py-3 text-lg font-bold text-white border-4 rounded-2xl shadow-md transition-all ${
            selectedPicture !== null
              ? "bg-blue-600 border-black cursor-pointer"
              : "bg-gray-300 border-gray-400 cursor-not-allowed"
          } ${schoolbell.className}`}
          disabled={selectedPicture === null}
        >
          SUBMIT
        </motion.button>
      </div>
    </div>
  );
};

export default FacePicker;
