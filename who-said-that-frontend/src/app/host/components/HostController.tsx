import { useMultiplayer } from "@/app/net/multiplayer";
import { Net } from "@/app/net/net";
import React, { useEffect, useState } from "react";
import RoundScreen from "../screens/RoundScreen";
import WaitingRoom from "../screens/WaitingRoom";
import { Chat, PlayerDetails } from "@/app/net/types";
import { GameState, useGameContext } from "@/app/GameContext";
import PresenterScreen from "../screens/PresenterScreen";
import EndGameScreen from "../screens/EndGameScreen";

const HostController = () => {
  const game = useGameContext();

  console.log("game");
  console.log(game);

  const rotationRef = React.useRef(0);

  const mp = useMultiplayer();

  useEffect(() => {
    // Prompt players when game state is balanced
    const intvl = setInterval(() => {
      if (game.state !== GameState.STARTED) return;
      Net.Helpers.Host.getChats(mp);

      let balanced = true;
      let lastChatLength = -1;

      game.chats!.forEach((chatThread) => {
        if (lastChatLength === -1) {
          lastChatLength = chatThread.thread.length;
        } else {
          if (chatThread.thread.length !== lastChatLength) {
            balanced = false;
          }
        }
      });
      if (balanced) {
        if (lastChatLength < rotationRef.current + 1) {
          balanced = false;
        }
      }
      if (balanced) {
        if (lastChatLength === game.players!.length + 1) {
          console.log("*** GAME ENDED ***");
          Net.Helpers.Host.announceGameEnd(mp);
          game.setState(GameState.PRESENTATION);
        } else {
          console.log("*** BROADCASTING NEW PROMPTS ***");
          Net.Helpers.Host.broadcastPrompts(mp);
          rotationRef.current++;
        }
      }
    }, 1000);

    return () => clearInterval(intvl);
  }, [game]);

  let render = null;

  switch (game.state) {
    default:
      render = <WaitingRoom />;
      break;
    case GameState.STARTED:
      render = <RoundScreen />;
      break;
    case GameState.PRESENTATION:
      render = <PresenterScreen />;
      break;
    case GameState.ENDED:
      render = <EndGameScreen />;
      break;
  }

  return render;
};

export default HostController;
