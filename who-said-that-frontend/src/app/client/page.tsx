"use client";

import React from "react";
import { Header, MessagingSection, PlayerCreation } from "@/app/client";

const GameComponent: React.FC = () => {
  return (
    <div className="relative h-screen flex flex-col items-center justify-between bg-gray-100">
      <Header />

      <div className="w-full">
        {/* <PlayerCreation /> */}
        <MessagingSection/>
      </div>
    </div>
  );
};

export default GameComponent;
