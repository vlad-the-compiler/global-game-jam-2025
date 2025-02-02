import React, { useState } from "react";
import { Chat, PlayerDetails } from "./net/types";
import { useMultiplayer } from "./net/multiplayer";
import { Net } from "./net/net";

export enum GameRole {
  "HOST",
  "CLIENT"
}

export enum GameState {
  "LOBBY",
  "STARTED",
  "PRESENTATION",
  "ENDED"
}

export interface IGameContext {
  role: GameRole;
  gm?: boolean;
  token: string;
  state: GameState;
  players?: PlayerDetails[];
  chats?: Chat[];
  setState: (newState: GameState) => void;
}

const GameContext = React.createContext<IGameContext>({
  role: GameRole.HOST,
  token: "",
  state: GameState.LOBBY,
  setState: (_: GameState) => {}
});

export interface GameContextProviderProps {
  role: GameRole;
}

export const GameContextProvider = ({ children, role }: React.PropsWithChildren<GameContextProviderProps>) => {
  const [token, setToken] = useState<string>("");
  const [gameState, setGameState] = useState(GameState.LOBBY);
  const [gm, setGm] = useState(false);
  const [players, setPlayers] = useState<PlayerDetails[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  const mp = useMultiplayer(
    (event) => {
      Net.Handlers.Host.handleHostRegistrationResponse(event, (token) => {
        console.log("host token: " + token);
        setToken(token);
      });
      Net.Handlers.Client.handlePlayerRegistrationResponse(event, (token, gameMaster) => {
        console.log("client token: " + token + " (" + gameMaster + ")");
        setToken(token);
        setGm(gameMaster);
      });
      Net.Handlers.Common.handlePlayerPool(event, (pool) => {
        console.log("player pool:");
        console.log(pool);
        setPlayers(pool);
      });
      Net.Handlers.Host.handleChatsReceived(event, (chats) => {
        console.log("chats:");
        console.log(chats);
        setChats(chats);
      });
      Net.Handlers.Host.handleAdvanceGame(event, () => {
        if (role === GameRole.HOST) {
          if (gameState === GameState.LOBBY) {
            setGameState(GameState.STARTED);
          }
        } else {
          console.log("*** ADVANCE ***");
        }
      });
      if (role === GameRole.CLIENT) {
        Net.Handlers.Client.handlePromptReceived(event, (_prompt) => {
          setGameState(GameState.STARTED);
        });
      }
      Net.Handlers.Common.handleGameEnd(event, () => {
        if (gameState === GameState.STARTED) {
          setGameState(GameState.PRESENTATION);
        } else {
          setGameState(GameState.ENDED);
        }
      });
    },
    {
      onConnect: () => {
        if (role === GameRole.HOST) {
          Net.Helpers.Host.registerHost(mp);
        } else {
          Net.Helpers.Client.registerPlayer(mp);
        }
      }
    }
  );

  return (
    <GameContext.Provider
      value={{
        role,
        token,
        state: gameState,
        setState: setGameState,
        ...(role === GameRole.HOST
          ? {
              players,
              chats
            }
          : {
              gm
            })
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);
