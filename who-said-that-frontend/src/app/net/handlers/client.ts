import { MultiplayerEvent } from "../multiplayer";
import { MultiplayerOpcodes } from "../opcodes";

export const handlePlayerRegistrationResponse = (event: MultiplayerEvent, callback: (token: string, gm: boolean) => void) => {
  if (event.op !== MultiplayerOpcodes.PLAYER_REGISTRATION_RESPONSE) return;

  const { token, gm } = event.data;

  callback(token, gm);
};

export const handlePromptReceived = (event: MultiplayerEvent, callback: (prompt: string) => void) => {
  if (event.op !== MultiplayerOpcodes.PROMPT_RECEIVED) return;

  callback(event.data.prompt);
};
