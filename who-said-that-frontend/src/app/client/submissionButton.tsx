import React, { useState } from "react";
import { Schoolbell } from "next/font/google";
import { motion } from "framer-motion";

const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400"
});

type SubmissionButtonProps = {
  debounce?: number;
  text?: string;
  handleLocalSubmit: (object: any) => void;
};

const SubmissionButton: React.FC<SubmissionButtonProps> = ({ debounce = 0, handleLocalSubmit, text = "Submit" }) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <motion.button
      onClick={(event) => {
        handleLocalSubmit(event);
        if (debounce !== 0) {
          setEnabled(false);
          setTimeout(() => {
            setEnabled(true);
          }, debounce);
        }
      }}
      disabled={!enabled}
      whileTap={{ scale: 0.9, rotate: [0, 5, -5, 5, -5, 0] }}
      className={`relative overflow-hidden p-5 text-md font-semibold text-white enabled:bg-gradient-to-r disabled:bg-gray-400  from-blue-500 via-blue-400 to-blue-500 bg-opacity-25 shadow-lg rounded-full transform transition-transform active:transform active:translate-y-1 group ${schoolbell.className}`}
      animate={{
        rotate: [0.4, 1.3, -0.8, 1.6, -1.2, 1.8, -0.5, 0.9, -1.4, 0.6, 0.4] // Jiggle animation
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        delay: 2 * 0.1 // Stagger for randomness
      }}
    >
      <span className="relative z-10">{text.toUpperCase()}</span>
      <span className="absolute inset-0 bg-blue-500 bg-opacity-20 backdrop-blur-sm group-active:backdrop-blur-lg group-active:bg-opacity-30"></span>
      <span className="absolute inset-0 -top-8 bg-gradient-to-b from-white to-transparent opacity-70 rounded-full group-active:opacity-100"></span>
    </motion.button>
  );
};

export default SubmissionButton;
