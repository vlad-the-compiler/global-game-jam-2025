import { handlePlayerRegistrationResponse, handlePromptReceived } from "./handlers/client";
import { handlePlayerPool } from "./handlers/common";
import { handleChatsReceived, handleHostRegistrationResponse } from "./handlers/host";
import { registerPlayer, registerPlayerDetails, submitResponse } from "./helpers/client";
import { queryPlayerPool } from "./helpers/common";
import { broadcastPrompts, getChats, registerHost } from "./helpers/host";

export const Net = {
  Helpers: {
    Host: {
      registerHost,
      broadcastPrompts,
      getChats
    },
    Client: {
      registerPlayer,
      registerPlayerDetails,
      submitResponse
    },
    Common: {
      queryPlayerPool
    }
  },
  Handlers: {
    Host: {
      handleHostRegistrationResponse,
      handleChatsReceived
    },
    Client: {
      handlePlayerRegistrationResponse,
      handlePromptReceived
    },
    Common: {
      handlePlayerPool
    }
  }
};
