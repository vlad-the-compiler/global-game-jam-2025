import { IMultiplayerHook } from "../multiplayer";
import { MultiplayerOpcodes } from "../opcodes";

export const registerHost = (mp: IMultiplayerHook, token?: string) => {
  return mp.dispatch(MultiplayerOpcodes.REGISTER_HOST, {
    token
  });
};

export const broadcastPrompts = (mp: IMultiplayerHook) => {
  return mp.dispatch(MultiplayerOpcodes.BROADCAST_PROMPTS);
};

export const getChats = (mp: IMultiplayerHook) => {
  return mp.dispatch(MultiplayerOpcodes.GET_CHATS);
};

export const announceGameEnd = (mp: IMultiplayerHook) => {
  return mp.dispatch(MultiplayerOpcodes.GAME_END);
};
