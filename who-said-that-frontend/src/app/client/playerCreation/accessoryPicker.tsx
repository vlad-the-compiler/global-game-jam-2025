import React, { useState } from "react";
import { Schoolbell } from "next/font/google";
import { motion } from "framer-motion";
import SubmissionButton from "@/app/client/submissionButton";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400",
});

type PicturePickerProps = {
  onSubmit: (pictureIndex: number) => void;
  color: string;
  face: string;
};

const pictures = [
  "/acc-0.png",
  "/acc-1.png",
  "/acc-2.png",
  "/acc-3.png",
  "/acc-4.png",
  "/acc-5.png",
  "/acc-6.png",
  "/acc-7.png",
  "/acc-8.png",
];

const AccessoryPicker: React.FC<PicturePickerProps> = ({ onSubmit, color, face }) => {
  const [selectedPicture, setSelectedPicture] = useState<number | null>(null);
  console.log(face);

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
          CHOOSE YOUR ACCESSORY
        </h1>

        {/* Picture Grid */}
        <div className="grid grid-cols-3 gap-6 overflow-visible">
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
              <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                <img
                  src={picture}
                  alt={`Placeholder ${index + 1}`}
                  className="w-[160%] h-[160%] object-cover z-20 max-w-[unset]"
                />
                <img src={face} className="absolute w-[160%] h-[160%] object-cover z-10" />
                <img
                  src="character-base.png"
                  className="absolute w-[160%] h-[160%] object-cover z-0"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <SubmissionButton handleLocalSubmit={handleLocalSubmit} />
      </div>
    </div>
  );
};

export default AccessoryPicker;
