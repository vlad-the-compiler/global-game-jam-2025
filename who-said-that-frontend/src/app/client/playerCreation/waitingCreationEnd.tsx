import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Schoolbell } from "next/font/google";
import SubmissionButton from "../submissionButton";
import { useGameContext } from "@/app/GameContext";
import { Net } from "@/app/net/net";
import { useMultiplayer } from "@/app/net/multiplayer";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400"
});

const waitingMessages = [
  "Hang tight, the other players are still figuring out how to use a touchscreen.",
  "Please hold while the other players pretend to be productive.",
  "One moment, the other players are busy overthinking the simplest thing.",
  "Please wait while the others try to remember their passwords.",
  "Hang on, the other players are stuck in a deep conversation with their coffee mugs.",
  "Wait a sec, the other players are having an intense debate on whether to hit 'submit'.",
  "The other players are still looking for their motivation. Please be patient.",
  "Hang tight, the others are having trouble choosing their 'fancy' name.",
  "Please wait, the other players are distracted by their own reflection.",
  "Hold on, the other players are busy solving the world's problems… but mostly just scrolling on their TikTok.",
  "Please be patient, the other players are taking a 'think break'… for the next 10 minutes.",
  "One moment, the other players are playing 'hide and seek' with their will to participate.",
  "Hold tight, the other players are busy pondering whether or not they actually care.",
  "Please wait, the other players are busy coming up with excuses. Again.",
  "Hang in there, the others are still stuck in their heads, plotting the perfect comeback.",
  "Please wait, the other players are currently having a staring contest with their screens.",
  "Hold on, the others are too busy debating if they should go for a snack first.",
  "Please wait, the other players are contemplating the meaning of life— or at least the next move.",
  "One moment, the other players are having an existential crisis over which button to press."
];

const WaitingCreationEnd: React.FC = () => {
  const [randomWaitingMessage, setRandomWaitingMessage] = useState("");

  const mp = useMultiplayer();
  const game = useGameContext();

  useEffect(() => {
    // Pick a random element and convert it to uppercase
    const randomElement = waitingMessages[Math.floor(Math.random() * waitingMessages.length)].toUpperCase();
    setRandomWaitingMessage(randomElement);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border-4 space-y-4 max-w-sm w-full">
        <h1 className={`text-2xl ${schoolbell.className} text-gray-700 uppercase`}>PLEASE WAIT...</h1>
        <motion.div
          className="w-16 h-16 border-4 border-t-blue-600 border-black rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear"
          }}
        />
        <p className={`text-gray-500 ${schoolbell.className}`}>{randomWaitingMessage}</p>
        {game.gm && (
          <SubmissionButton
            text="Start game"
            handleLocalSubmit={() => {
              Net.Helpers.Client.advanceGame(mp);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WaitingCreationEnd;
