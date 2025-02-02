import React, { useState } from "react";
import { PlayerCreationPages, SubmissionButton } from "@/app/client";
import { useMultiplayer } from "@/app/net/multiplayer";
import { Net } from "@/app/net/net";
import { useGameContext } from "@/app/GameContext";
import { Schoolbell } from "next/font/google";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400"
});

const RemoteControlScreen: React.FC = () => {
  const mp = useMultiplayer();
  const game = useGameContext();

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border-4 space-y-4 max-w-sm w-full">
          <p className={`text-gray-500 ${schoolbell.className} text-2xl text-center uppercase`}>
            {game.gm ? "Use your built-in pointing device (your finger!) to advance the conversations." : "Sit back and enjoy the chaos."}
          </p>

          {game.gm && (
            <SubmissionButton
              text="Next"
              debounce={1000}
              handleLocalSubmit={() => {
                Net.Helpers.Client.advanceGame(mp);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RemoteControlScreen;
