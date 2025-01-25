"use client";

import { MultiplayerProvider, useMultiplayer } from "@/app/net/multiplayer";
import React, { useEffect, useRef, useState } from "react";
import { Net } from "../net/net";
import { PlayerDetails } from "../net/types";
import QRCode from "react-qr-code";

const os = require("os");

function getLocalIPAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    for (const address of addresses) {
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

  const multiplayer = useMultiplayer((event) => {
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
  });

  useEffect(() => {
    const testCoroutine = async (simulatedPlayers: number) => {
      console.log(">>> Register host & players");
      Net.Helpers.Host.registerHost(multiplayer);
      for (let i = 0; i < simulatedPlayers; i++) {
        Net.Helpers.Client.registerPlayer(multiplayer);
      }
      Net.Helpers.Common.queryPlayerPool(multiplayer);
      await waitForMillis(500);
      console.log(">>> Register player details");
      playerPool.current.forEach((player, index) => {
        Net.Helpers.Client.registerPlayerDetails(multiplayer, player.token, "Costica " + index, index, index + 1, index + 2);
      });
      await waitForMillis(500);
      console.log(">>> Simulate canned prompt round (1)");
      Net.Helpers.Host.broadcastPrompts(multiplayer);
      await waitForMillis(500);
      playerPool.current.forEach((player, index) => {
        Net.Helpers.Client.submitResponse(multiplayer, player.token, `Response of player ${index + 1}`);
      });
      await waitForMillis(500);
      console.log(">>> Get current chats");
      Net.Helpers.Host.getChats(multiplayer);
      await waitForMillis(500);
      for (let i = 2; i <= simulatedPlayers; i++) {
        console.log(`>>> Simulate rotation round (${i})`);
        Net.Helpers.Host.broadcastPrompts(multiplayer);
        await waitForMillis(500);
        playerPool.current.forEach((player, index) => {
          Net.Helpers.Client.submitResponse(multiplayer, player.token, `Response #${i} of player ${index + 1}`);
        });
        await waitForMillis(500);
      }
      console.log(">>> Get current chats");
      Net.Helpers.Host.getChats(multiplayer);
    };

    // Run test
    setTimeout(() => {
      testCoroutine(8);
    }, 1000);
  }, []);

  return <>Game loop simulator mounted!</>;
};

const generateStaticParams = () => {};

export default function Page() {
  return (
    <MultiplayerProvider>
      <h1>***Host page***</h1>
      <br />
      <MultiplayerTest />
      <br />
      <div className="bg-white inline-block m-4 p-4 rounded-xl">
        <div className="inline-block rounded-lg overflow-clip m-0 p-0">
          <QRCode value={`http://${process.env.GAME_SERVER_ADDRESS}:${process.env.LISTEN_PORT}/client`} />
        </div>
      </div>
      <br />
    </MultiplayerProvider>
  );
}
