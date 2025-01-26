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
  gm: boolean;
  token: string;
  state: GameState;
  players: PlayerDetails[];
  chats: Chat[];
}

const GameContext = React.createContext<IGameContext>({
  role: GameRole.HOST,
  gm: false,
  token: "",
  state: GameState.LOBBY,
  players: [],
  chats: []
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
        console.log("pula mea: " + token);
        setToken(token);
      });
      Net.Handlers.Client.handlePlayerRegistrationResponse(event, (token, gameMaster) => {
        console.log("pizda pe care mi-o doresc: " + token + " (" + gameMaster + ")");
        setToken(token);
        setGm(gameMaster);
      });
      Net.Handlers.Common.handlePlayerPool(event, (pool) => {
        console.log("player pool-a mea:");
        console.log(pool);
        setPlayers(pool);
      });
      Net.Handlers.Host.handleChatsReceived(event, (chats) => {
        setChats(chats);
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
        gm,
        state: gameState,
        players,
        chats
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);
