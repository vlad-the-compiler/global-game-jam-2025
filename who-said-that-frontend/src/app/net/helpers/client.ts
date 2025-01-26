import { IMultiplayerHook } from "../multiplayer";
import { MultiplayerOpcodes } from "../opcodes";

export const registerPlayer = (mp: IMultiplayerHook, token?: string) => {
  return mp.dispatch(MultiplayerOpcodes.REGISTER_PLAYER, {
    token
  });
};

export const registerPlayerDetails = (
  mp: IMultiplayerHook,
  token: string,
  name: string,
  color: number,
  face: number,
  accessory: number
) => {
  return mp.dispatch(MultiplayerOpcodes.REGISTER_PLAYER_DETAILS, {
    token,
    name,
    color,
    face,
    accessory
  });
};

export const submitResponse = (mp: IMultiplayerHook, token: string, response: string) => {
  return mp.dispatch(MultiplayerOpcodes.SUBMIT_RESPONSE, {
    token,
    response
  });
};

export const advanceGame = (mp: IMultiplayerHook) => {
  return mp.dispatch(MultiplayerOpcodes.ADVANCE_GAME);
};
