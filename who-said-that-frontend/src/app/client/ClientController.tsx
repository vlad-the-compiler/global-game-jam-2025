import { useMultiplayer } from "@/app/net/multiplayer";
import { Net } from "@/app/net/net";
import { useState } from "react";
import MessagingSection from "./messagingSection";
import { PlayerCreation } from ".";

const ClientController = () => {
  const [playing, setPlaying] = useState(false);
  const [prompt, setPrompt] = useState("");

  const mp = useMultiplayer((event) => {
    Net.Handlers.Client.handlePromptReceived(event, (newPrompt) => {
      setPlaying(true);
      setPrompt(newPrompt);
    });
  });

  return (
    <>
      {playing ? (
        <MessagingSection
          prompt={prompt}
          onSent={() => {
            setPrompt("");
          }}
        />
      ) : (
        <PlayerCreation />
      )}
    </>
  );
};

export default ClientController;
