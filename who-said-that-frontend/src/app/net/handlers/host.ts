import { MultiplayerEvent } from "../multiplayer";
import { MultiplayerOpcodes } from "../opcodes";
import { Chat } from "../types";

export const handleHostRegistrationResponse = (event: MultiplayerEvent, callback: (token: string) => void) => {
  if (event.op !== MultiplayerOpcodes.HOST_REGISTRATION_RESPONSE) return;

  callback(event.data.token);
};

export const handleChatsReceived = (event: MultiplayerEvent, callback: (chats: Chat[]) => void) => {
  if (event.op !== MultiplayerOpcodes.CHATS_RECEIVED) return;

  callback(event.data.chats);
};

export const handleAdvanceGame = (event: MultiplayerEvent, callback: () => void) => {
  if (event.op !== MultiplayerOpcodes.ADVANCE_GAME) return;

  callback();
};
