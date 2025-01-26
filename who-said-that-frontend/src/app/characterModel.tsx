import React, { useState } from "react";
import { Schoolbell } from "next/font/google";
import { Nullable } from "@/utils/types";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400"
});

type CharacterModelProps = {
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color: Nullable<number>;
  face: Nullable<number>;
  accessory: Nullable<number>;
};

const colors = [
  "bg-purple-400", // violet
  "bg-indigo-500", // purple
  "bg-blue-200", // blue
  "bg-blue-400", // turqoise
  "bg-green-400", // green
  "bg-yellow-200", // yellow
  "bg-yellow-400", // orange
  "bg-red-500", // red
  "bg-pink-400" // pink
];

const faces = [
  "/face-0.png",
  "/face-1.png",
  "/face-2.png",
  "/face-3.png",
  "/face-4.png",
  "/face-5.png",
  "/face-6.png",
  "/face-7.png",
  "/face-8.png"
];

const accessories = [
  "/acc-0.png",
  "/acc-1.png",
  "/acc-2.png",
  "/acc-3.png",
  "/acc-4.png",
  "/acc-5.png",
  "/acc-6.png",
  "/acc-7.png",
  "/acc-8.png"
];

const CharacterModel: React.FC<CharacterModelProps> = ({ name, size = "md", color = null, face = null, accessory = null }) => {
  return (
    <div
      className={`w-${size === "md" ? "12" : size === "sm" ? "8" : size === "xl" ? "20" : "16"} h-${
        size === "md" ? "12" : size === "sm" ? "8" : size === "xl" ? "20" : "16"
      } rounded-full border-4 cursor-pointer shadow-md transition-all overflow-visible ${colors[color !== null ? color : 0]}`}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-visible">
        {accessory !== null && <img src={accessories[accessory]} className="w-[160%] h-[160%] object-cover z-20 max-w-[unset]" />}
        {face !== null && <img src={faces[face]} className="absolute w-[160%] h-[160%] object-cover z-10" />}
        <img src="character-base.png" className="absolute w-[160%] h-[160%] object-cover z-0" />
      </div>
      <h4 className={`text-${size} ${schoolbell.className} text-gray-700 uppercase pt-4`}>{name}</h4>
    </div>
  );
};

export default CharacterModel;
