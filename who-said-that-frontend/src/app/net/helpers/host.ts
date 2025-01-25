import { IMultiplayerContext } from "../multiplayer";
import { MultiplayerOpcodes } from "../opcodes";

export const registerHost = (mp: IMultiplayerContext, token?: string) => {
  mp.dispatch(MultiplayerOpcodes.REGISTER_HOST, {
    token
  });
};

export const broadcastPrompts = (mp: IMultiplayerContext) => {
  mp.dispatch(MultiplayerOpcodes.BROADCAST_PROMPTS);
};

export const getChats = (mp: IMultiplayerContext) => {
  mp.dispatch(MultiplayerOpcodes.GET_CHATS);
};
