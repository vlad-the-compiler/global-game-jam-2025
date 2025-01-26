"use client";

import { MultiplayerProvider, useMultiplayer } from "@/app/net/multiplayer";
import os from "os";
import { useEffect, useRef } from "react";
import { GameContextProvider, GameRole, useGameContext } from "../GameContext";
import { Net } from "../net/net";
import { PlayerDetails } from "../net/types";
import HalftoneContainer from "./components/HalftoneContainer";
import WaitingRoom from "./screens/WaitingRoom";
import HostController from "./components/HostController";
import RoundScreen from "./screens/RoundScreen";
import PresenterScreen from "./screens/PresenterScreen";
import EndGameScreen from "./screens/EndGameScreen";

function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    for (const address of addresses!) {
      // Check if the address is IPv4 and not internal (not localhost)
      if (address.family === "IPv4" && !address.internal) {
        return address.address; // Return the first non-internal IPv4 address
      }
    }
  }
  return "127.0.0.1"; // Default to localhost if no address is found
}

console.log("Local Machine IP Address:", getLocalIPAddress());

const waitForMillis = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const MultiplayerTest = () => {
  const playerPool = useRef<PlayerDetails[]>([]);

  const multiplayer = useMultiplayer(
    (event) => {
      console.log("[mp] Received: <" + event.op + "> " + JSON.stringify(event.data));

      Net.Handlers.Host.handleHostRegistrationResponse(event, (token) => {
        console.log(`Host ${token} registered for new session.`);
      });
      Net.Handlers.Client.handlePlayerRegistrationResponse(event, (token, gm) => {
        console.log(`Player ${token} (${gm ? "Game Master" : "Normal Player"}) registered.`);
      });
      Net.Handlers.Common.handlePlayerPool(event, (pool) => {
        console.log(`Player pool:`);
        console.log(pool);
        playerPool.current = pool;
      });
      Net.Handlers.Client.handlePromptReceived(event, (prompt) => {
        console.log(`Prompt received: ${prompt}`);
      });
      Net.Handlers.Host.handleChatsReceived(event, (chats) => {
        console.log("Chats:");
        console.log(chats);
      });
      Net.Handlers.Host.handleAdvanceGame(event, () => {
        console.log("Advance game event relayed to host!");
      });
    },
    {
      onConnect: () => {
        console.log("Hi!");
      },
      onError: () => {
        console.log("Uhh...");
      },
      onDisconnect: () => {
        console.log("Bye!");
      }
    }
  );

  useEffect(() => {
    const testCoroutine = async (simulatedPlayers: number) => {
      console.log(">>> Register host & players");
      if (!Net.Helpers.Host.registerHost(multiplayer)) return;
      for (let i = 0; i < simulatedPlayers; i++) {
        if (!Net.Helpers.Client.registerPlayer(multiplayer)) return;
      }
      if (!Net.Helpers.Common.queryPlayerPool(multiplayer)) return;
      await waitForMillis(5000);
      console.log(">>> Register player details");
      playerPool.current.forEach((player, index) => {
        if (!Net.Helpers.Client.registerPlayerDetails(multiplayer, player.token, "Costica " + index, index, index + 1, index + 2)) return;
      });
      await waitForMillis(500);
      console.log(">>> Simulate Game Start");
      if (!Net.Helpers.Client.advanceGame(multiplayer)) return;
      await waitForMillis(500);
      console.log(">>> Simulate canned prompt round (1)");
      if (!Net.Helpers.Host.broadcastPrompts(multiplayer)) return;
      await waitForMillis(500);
      playerPool.current.forEach((player, index) => {
        if (!Net.Helpers.Client.submitResponse(multiplayer, player.token, `Response of player ${index + 1}`)) return;
      });
      await waitForMillis(500);
      console.log(">>> Get current chats");
      if (!Net.Helpers.Host.getChats(multiplayer)) return;
      await waitForMillis(500);
      for (let i = 2; i <= simulatedPlayers; i++) {
        console.log(`>>> Simulate rotation round (${i})`);
        if (!Net.Helpers.Host.broadcastPrompts(multiplayer)) return;
        await waitForMillis(500);
        playerPool.current.forEach((player, index) => {
          if (!Net.Helpers.Client.submitResponse(multiplayer, player.token, `Response #${i} of player ${index + 1}`)) return;
        });
        await waitForMillis(500);
      }
      console.log(">>> Get current chats");
      if (!Net.Helpers.Host.getChats(multiplayer)) return;
    };

    // Run test
    setTimeout(() => {
      testCoroutine(3);
    }, 1000);
  }, []);

  return null;
};

const generateStaticParams = () => {};

export default function Page() {
  return (
    <MultiplayerProvider>
      <GameContextProvider role={GameRole.HOST}>
        <HalftoneContainer>
          {/* <HostController /> */}
          <MultiplayerTest />
          {/* <TitleScreen /> */}
          {/* <WaitingRoom /> */}
          {/* <RoundScreen /> */}
          {/* <PresenterScreen /> */}
          {/* <EndGameScreen /> */}

          {/* <HContainer>
          <div className="font-[family-name:var(--font-archivo-black)] font-black text-[50px]">Text goes here</div>
          hmmmm
        </HContainer> */}
          {/* <VContainer>
          <div className="inline-block rounded-lg overflow-clip m-0 p-0">
            <QRCode value={`http://${process.env.GAME_SERVER_ADDRESS}:${process.env.LISTEN_PORT}/client`} />
          </div>
        </VContainer> */}
          {/* <MultiplayerTest /> */}
          {/* <h1>***Host page***</h1>
        <br />
        <br />
        <div className="bg-white inline-block m-4 p-4 rounded-xl">
          <div className="inline-block rounded-lg overflow-clip m-0 p-0">
            <QRCode value={`http://${process.env.GAME_SERVER_ADDRESS}:${process.env.LISTEN_PORT}/client`} />
          </div>
        </div>
        <br /> */}
        </HalftoneContainer>
      </GameContextProvider>
    </MultiplayerProvider>
  );
}
