import React, { useState } from "react";
import NamePicker from "@/app/client/playerCreation/namePicker";

const PlayerCreation: React.FC = () => {
  const handleSubmit = (playerName: string) => {
    if (playerName.trim() === "") {
      alert("Please enter a name before submitting.");
      return;
    }
    alert(`Player Name Submitted: ${playerName}`);
  };

  return <NamePicker onSubmit={handleSubmit} />;
};

export default PlayerCreation;
