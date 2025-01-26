import { IMultiplayerHook } from "../multiplayer";
import { MultiplayerOpcodes } from "../opcodes";

export const queryPlayerPool = (mp: IMultiplayerHook) => {
  return mp.dispatch(MultiplayerOpcodes.QUERY_PLAYER_POOL);
};
