import { IMultiplayerContext } from "../multiplayer";
import { MultiplayerOpcodes } from "../opcodes";

export const registerPlayer = (mp: IMultiplayerContext, token?: string) => {
  mp.dispatch(MultiplayerOpcodes.REGISTER_PLAYER, {
    token
  });
};

export const registerPlayerDetails = (
  mp: IMultiplayerContext,
  token: string,
  name: string,
  color: number,
  face: number,
  accessory: number
) => {
  mp.dispatch(MultiplayerOpcodes.REGISTER_PLAYER_DETAILS, {
    token,
    name,
    color,
    face,
    accessory
  });
};

export const submitResponse = (mp: IMultiplayerContext, token: string, response: string) => {
  mp.dispatch(MultiplayerOpcodes.SUBMIT_RESPONSE, {
    token,
    response
  });
};
