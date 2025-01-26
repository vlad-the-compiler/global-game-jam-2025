import { useMultiplayer } from "@/app/net/multiplayer";
import { Net } from "@/app/net/net";
import React, { useEffect, useState } from "react";
import RoundScreen from "../screens/RoundScreen";
import WaitingRoom from "../screens/WaitingRoom";
import { Chat } from "@/app/net/types";

const HostController = () => {
  const [playing, setPlaying] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);

  const playStateRef = React.useRef<boolean>(false);
  playStateRef.current = playing;

  const mp = useMultiplayer((event) => {
    Net.Handlers.Host.handleAdvanceGame(event, () => {
      setPlaying(true);
      // setTimeout(() => {
      //   Net.Helpers.Host.broadcastPrompts(mp);
      // }, 1000);
    });
    Net.Handlers.Host.handleChatsReceived(event, (newChats) => {
      console.log("Chats:");
      console.log(newChats);
      setChats(newChats);
    });
  });

  useEffect(() => {
    setInterval(() => {
      if (!playStateRef.current) return;

      Net.Helpers.Host.getChats(mp);
      let chatsValid = true;
      let lastChatLength = -1;

      chats.forEach((chatThread) => {
        if (lastChatLength === -1) {
          lastChatLength = chatThread.thread.length;
        } else {
          if (chatThread.thread.length !== lastChatLength) {
            chatsValid = false;
          }
        }
      });

      if (chatsValid) {
        if (lastChatLength === 1) {
          chatsValid = false;
        }
      }

      if (chatsValid) {
        Net.Helpers.Host.broadcastPrompts(mp);
      }
    }, 1000);
  }, []);

  return <>{playing ? <RoundScreen /> : <WaitingRoom />}</>;
};

export default HostController;
