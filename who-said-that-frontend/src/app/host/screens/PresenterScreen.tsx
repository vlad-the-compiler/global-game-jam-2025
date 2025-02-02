import CharacterModel from "@/app/characterModel";
import { GameState, useGameContext } from "@/app/GameContext";
import { useMultiplayer } from "@/app/net/multiplayer";
import { Net } from "@/app/net/net";
import { PlayerDetails } from "@/app/net/types";
import { Nullable } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { HContainer, HeadingContainer, VContainer } from "../components/Containers";
import GameLogo from "../components/GameLogo";
import styles from "../components/style/animation.module.css";
import { Schoolbell } from "next/font/google";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400"
});

interface PlayerThread {
  player: PlayerDetails;
  thread: string[];
}

const PresenterScreen = () => {
  const [thread, setThread] = useState<Nullable<PlayerThread>>(null);

  const [threadNo, setThreadNo] = useState(0);
  const threadNoRef = React.useRef(0);

  const setThreadNoSync = (no: number) => {
    setThreadNo(no);
    threadNoRef.current = no;
  };

  const [threadDepth, setThreadDepth] = useState(0);
  const threadDepthRef = React.useRef(0);

  const setThreadDepthSync = (depth: number) => {
    setThreadDepth(depth);
    threadDepthRef.current = depth;
  };

  useEffect(() => {
    setThread({
      player: game.players![threadNo],
      thread: game.chats![threadNo].thread
    });
    setThreadDepthSync(0);
  }, [threadNo]);

  const game = useGameContext();
  const mp = useMultiplayer((event) => {
    Net.Handlers.Host.handleAdvanceGame(event, () => {
      if (threadDepthRef.current < game.players!.length) {
        setThreadDepthSync(threadDepthRef.current + 1);
      } else {
        if (threadNoRef.current < game.players!.length - 1) {
          setThreadNoSync(threadNoRef.current + 1);
        } else {
          Net.Helpers.Host.announceGameEnd(mp);
          game.setState(GameState.ENDED);
        }
      }
    });
  });

  return (
    <HContainer>
      <VContainer>
        <GameLogo />
      </VContainer>
      <div className="flex pr-8 w-full h-full flex-1 flex-col justify-start overflow-hidden">
        <HContainer className="py-4 flex-grow-0 uppercase">
          <HeadingContainer size="medium">{thread?.player.name}'s thread</HeadingContainer>
        </HContainer>
        <VContainer justify="end" className="overflow-hidden">
          {thread?.thread.map((k, n) => {
            if (n > threadDepth) return null;

            const basePlayerIndex = game.players?.findIndex((x) => x.token === thread.player.token);
            const currentPlayerIndex = (basePlayerIndex! + n - 1) % game.players!.length;

            const currentPlayer = n === 0 ? null : game.players![currentPlayerIndex];

            const color = currentPlayer?.color || null;
            const face = currentPlayer?.face || null;
            const accessory = currentPlayer?.accessory || null;

            return (
              <HContainer key={n} className={`flex-grow-0 p-4 mb-8 bg-white border-4 border-black rounded-lg ${styles.expandableContent}`}>
                <VContainer className="flex-grow-0">
                  <CharacterModel color={color} face={face} accessory={accessory} size="lg" name="" />
                </VContainer>
                <div className={`flex-1 pl-4 uppercase ${schoolbell.className}`}>{k}</div>
              </HContainer>
            );
          })}
        </VContainer>
      </div>
    </HContainer>
  );
};

export default PresenterScreen;
