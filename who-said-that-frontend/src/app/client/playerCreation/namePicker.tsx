import React, { useState } from "react";
import { Schoolbell } from "next/font/google";
import SubmissionButton from "@/app/client/submissionButton";

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
          maxLength={maxNameLength}
          placeholder="Choose Your Name"
          className={`w-full p-4 text-lg border-4 border-black text-black rounded-2xl shadow-md focus:outline-none ${schoolbell.className} uppercase`}
        />
        <div className="text-sm text-gray-500">
          {playerName.length}/{maxNameLength}
        </div>
        <SubmissionButton handleLocalSubmit={handleLocalSubmit} />
      </div>
    </div>
  );
};

export default NamePicker;
