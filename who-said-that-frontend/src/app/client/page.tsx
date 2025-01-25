"use client";

import React from "react";
import { Header, MessagingSection, PlayerCreation } from "@/app/client";

const GameComponent: React.FC = () => {
  return (
    <div className="relative h-screen flex flex-col justify-between bg-gray-100">
      {/* Top Header (Logo and Buttons) */}
      <Header />

      {/* Messages Container (Centered at bottom) */}
      {/* <MessagingSection /> */}

      <PlayerCreation/>
    </div>
  );
};

export default GameComponent;
