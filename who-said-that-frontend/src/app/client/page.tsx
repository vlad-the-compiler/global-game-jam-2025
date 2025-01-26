"use client";

import { Header, MessagingSection, PlayerCreation } from "@/app/client";
import React from "react";
import { GameContextProvider, GameRole } from "../GameContext";
import { MultiplayerProvider } from "../net/multiplayer";
import ClientController from "./ClientController";

const GameComponent: React.FC = () => {
  return (
    <MultiplayerProvider>
      <GameContextProvider role={GameRole.CLIENT}>
        <div className="relative h-screen flex flex-col items-center justify-between bg-gray-100">
          <Header />
          <div className="w-full">
            <ClientController />
            {/* <PlayerCreation /> */}
            {/* <MessagingSection /> */}
          </div>
        </div>
      </GameContextProvider>
    </MultiplayerProvider>
  );
};

export default GameComponent;
