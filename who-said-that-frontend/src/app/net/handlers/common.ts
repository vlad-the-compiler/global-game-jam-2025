import { MultiplayerEvent } from "../multiplayer";
import { MultiplayerOpcodes } from "../opcodes";
import { PlayerDetails } from "../types";

export const handlePlayerPool = (event: MultiplayerEvent, callback: (players: PlayerDetails[]) => void) => {
  if (event.op !== MultiplayerOpcodes.PLAYER_POOL) return;

  callback(event.data.players);
};

export const handleGameEnd = (event: MultiplayerEvent, callback: () => void) => {
  if (event.op !== MultiplayerOpcodes.GAME_END) return;

  callback();
};
