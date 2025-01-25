import { IMultiplayerContext } from "../multiplayer";
import { MultiplayerOpcodes } from "../opcodes";

export const queryPlayerPool = (mp: IMultiplayerContext) => {
  mp.dispatch(MultiplayerOpcodes.QUERY_PLAYER_POOL);
};
