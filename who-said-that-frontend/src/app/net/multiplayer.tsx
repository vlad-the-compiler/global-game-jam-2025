import { createContext, useContext, useEffect, useRef } from "react";
import { Nullable } from "@/utils/types";
import { MultiplayerOpcodes } from "./opcodes";

export interface MultiplayerEvent {
  op: MultiplayerOpcodes;
  data?: any;
}

export type MultiplayerEventHandler = (event: MultiplayerEvent) => void;
export type MultiplayerEventDispatch = (op: MultiplayerOpcodes, data?: any) => boolean;

export interface IMultiplayerContext {
  available: () => boolean;
  register: (handler: MultiplayerEventHandler) => void;
  deregister: (handler: MultiplayerEventHandler) => void;
  dispatch: MultiplayerEventDispatch;
}

export const MultiplayerContext = createContext<IMultiplayerContext>({
  available: () => false,
  register: (_: MultiplayerEventHandler) => {},
  deregister: (_: MultiplayerEventHandler) => {},
  dispatch: (_: MultiplayerOpcodes, __?: any) => false
});

export const MultiplayerProvider = ({ children }: React.PropsWithChildren) => {
  const socket = useRef<Nullable<WebSocket>>(null);
  const handlers = useRef<MultiplayerEventHandler[]>([]);

  useEffect(() => {
    // Establish connection to game server
    const ws = new WebSocket(process.env.WS_HOST ?? "");
    socket.current = ws;

    // Mount onmessage event for all handlers
    socket.current.onmessage = (ev: MessageEvent) => {
      try {
        const parsed: MultiplayerEvent = JSON.parse(ev.data);

        handlers.current.forEach((handler) => handler(parsed));
      } catch {}
    };

    // Debug stuff
    socket.current.onopen = () => console.log("[ws] Connected!");
    socket.current.onerror = () => console.log("[ws] Errored!");
    socket.current.onclose = () => console.log("[ws] Disconnected!");
  }, []);

  const available = () => socket.current?.OPEN === 1 || false;
  const register = (handler: MultiplayerEventHandler) => {
    const handlerIndex = handlers.current.indexOf(handler);

    if (handlerIndex === -1) {
      handlers.current = [...handlers.current, handler];
    }
  };
  const deregister = (handler: MultiplayerEventHandler) => {
    handlers.current = handlers.current.filter((x) => x !== handler);
  };
  const dispatch: MultiplayerEventDispatch = (op, data?) => {
    if (!available()) return false;

    const message: MultiplayerEvent = {
      op,
      data
    };

    socket.current?.send(JSON.stringify(message));

    return true;
  };

  const context: IMultiplayerContext = {
    available,
    register,
    deregister,
    dispatch
  };

  return <MultiplayerContext value={context}>{children}</MultiplayerContext>;
};

export const useMultiplayer = (handler: MultiplayerEventHandler) => {
  const context = useContext(MultiplayerContext);

  useEffect(() => {
    context.register(handler);

    return () => {
      context.deregister(handler);
    };
  }, [context, handler]);

  return context;
};
