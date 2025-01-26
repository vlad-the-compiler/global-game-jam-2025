import { handlePlayerRegistrationResponse, handlePromptReceived } from "./handlers/client";
import { handleGameEnd, handlePlayerPool } from "./handlers/common";
import { handleAdvanceGame, handleChatsReceived, handleHostRegistrationResponse } from "./handlers/host";
import { advanceGame, registerPlayer, registerPlayerDetails, submitResponse } from "./helpers/client";
import { queryPlayerPool } from "./helpers/common";
import { announceGameEnd, broadcastPrompts, getChats, registerHost } from "./helpers/host";

export const Net = {
  Helpers: {
    Host: {
      registerHost,
      broadcastPrompts,
      getChats,
      announceGameEnd
    },
    Client: {
      registerPlayer,
      registerPlayerDetails,
      submitResponse,
      advanceGame
    },
    Common: {
      queryPlayerPool
    }
  },
  Handlers: {
    Host: {
      handleHostRegistrationResponse,
      handleChatsReceived,
      handleAdvanceGame
    },
    Client: {
      handlePlayerRegistrationResponse,
      handlePromptReceived
    },
    Common: {
      handlePlayerPool,
      handleGameEnd
    }
  }
};
