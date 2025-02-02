import { useMultiplayer } from "@/app/net/multiplayer";
import { Net } from "@/app/net/net";
import { useState } from "react";
import MessagingSection from "./messagingSection";
import { PlayerCreation } from ".";
import { GameState, useGameContext } from "../GameContext";
import RemoteControlScreen from "./presenterScreen";
import ClientEndScreen from "./endScreen";

const ClientController = () => {
  const [prompt, setPrompt] = useState("");

  const game = useGameContext();

  const mp = useMultiplayer((event) => {
    Net.Handlers.Client.handlePromptReceived(event, (newPrompt) => {
      setPrompt(newPrompt);
    });
  });

  let render = null;

  switch (game.state) {
    default:
      render = <PlayerCreation />;
      break;
    case GameState.STARTED:
      render = (
        <MessagingSection
          prompt={prompt}
          onSent={() => {
            setPrompt("");
          }}
        />
      );
      break;
    case GameState.PRESENTATION:
      render = <RemoteControlScreen />;
      break;
    case GameState.ENDED:
      render = <ClientEndScreen />;
      break;
  }

  return render;
};

export default ClientController;
