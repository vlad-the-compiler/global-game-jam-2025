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
  registerOnConnect: (handler: () => void) => void;
  deregisterOnConnect: (handler: () => void) => void;
  registerOnError: (handler: () => void) => void;
  deregisterOnError: (handler: () => void) => void;
  registerOnDisconnect: (handler: () => void) => void;
  deregisterOnDisconnect: (handler: () => void) => void;
  register: (handler: MultiplayerEventHandler) => void;
  deregister: (handler: MultiplayerEventHandler) => void;
  dispatch: MultiplayerEventDispatch;
}

export const MultiplayerContext = createContext<IMultiplayerContext>({
  available: () => false,
  registerOnConnect: (_: () => void) => {},
  deregisterOnConnect: (_: () => void) => {},
  registerOnError: (_: () => void) => {},
  deregisterOnError: (_: () => void) => {},
  registerOnDisconnect: (_: () => void) => {},
  deregisterOnDisconnect: (_: () => void) => {},
  register: (_: MultiplayerEventHandler) => {},
  deregister: (_: MultiplayerEventHandler) => {},
  dispatch: (_: MultiplayerOpcodes, __?: any) => false
});

export const MultiplayerProvider = ({ children }: React.PropsWithChildren) => {
  const socket = useRef<Nullable<WebSocket>>(null);
  const isConnected = useRef<boolean>(false);
  const onConnectHandlers = useRef<(() => void)[]>([]);
  const onErrorHandlers = useRef<(() => void)[]>([]);
  const onDisconnectHandlers = useRef<(() => void)[]>([]);
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

    // Mount WS lifecycle events for all handlers
    socket.current.onopen = () => {
      console.log("[ws] Connected!");
      isConnected.current = true;
      onConnectHandlers.current.forEach((handler) => handler());
    };
    socket.current.onerror = () => {
      console.log("[ws] Errored!");
      onErrorHandlers.current.forEach((handler) => handler());
    };
    socket.current.onclose = () => {
      console.log("[ws] Disconnected!");
      isConnected.current = false;
      onDisconnectHandlers.current.forEach((handler) => handler());
    };
  }, []);

  const registerGenericEventHandler = (evHandlersRef: React.RefObject<(() => void)[]>, handler: () => void) => {
    const handlerIndex = evHandlersRef.current.indexOf(handler);

    if (handlerIndex === -1) {
      evHandlersRef.current = [...evHandlersRef.current, handler];
    }
  };
  const deregisterGenericEventHandler = (evHandlersRef: React.RefObject<(() => void)[]>, handler: () => void) => {
    evHandlersRef.current = evHandlersRef.current.filter((x) => x !== handler);
  };

  const available = () => isConnected.current;
  const register = (handler: MultiplayerEventHandler) => {
    const handlerIndex = handlers.current.indexOf(handler);

    if (handlerIndex === -1) {
      handlers.current = [...handlers.current, handler];
    }
  };
  const deregister = (handler: MultiplayerEventHandler) => {
    handlers.current = handlers.current.filter((x) => x !== handler);
  };
  const registerOnConnect = (handler: () => void) => registerGenericEventHandler(onConnectHandlers, handler);
  const deregisterOnConnect = (handler: () => void) => deregisterGenericEventHandler(onConnectHandlers, handler);
  const registerOnError = (handler: () => void) => registerGenericEventHandler(onErrorHandlers, handler);
  const deregisterOnError = (handler: () => void) => deregisterGenericEventHandler(onErrorHandlers, handler);
  const registerOnDisconnect = (handler: () => void) => registerGenericEventHandler(onDisconnectHandlers, handler);
  const deregisterOnDisconnect = (handler: () => void) => deregisterGenericEventHandler(onDisconnectHandlers, handler);
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
    registerOnConnect,
    deregisterOnConnect,
    registerOnError,
    deregisterOnError,
    registerOnDisconnect,
    deregisterOnDisconnect,
    dispatch
  };

  return <MultiplayerContext value={context}>{children}</MultiplayerContext>;
};

export interface MultiplayerHookExtras {
  onConnect?: () => void;
  onError?: () => void;
  onDisconnect?: () => void;
}

export interface IMultiplayerHook {
  available: () => boolean;
  dispatch: MultiplayerEventDispatch;
}

export const useMultiplayer = (handler: MultiplayerEventHandler, extras?: MultiplayerHookExtras) => {
  const context = useContext(MultiplayerContext);

  useEffect(() => {
    context.register(handler);
    extras?.onConnect && context.registerOnConnect(extras?.onConnect);
    extras?.onDisconnect && context.registerOnDisconnect(extras?.onDisconnect);
    extras?.onError && context.registerOnError(extras?.onError);

    return () => {
      context.deregister(handler);
      extras?.onConnect && context.deregisterOnConnect(extras?.onConnect);
      extras?.onDisconnect && context.deregisterOnDisconnect(extras?.onDisconnect);
      extras?.onError && context.deregisterOnError(extras?.onError);
    };
  }, [context, handler]);

  const { available, dispatch } = context;

  const api: IMultiplayerHook = {
    available,
    dispatch
  };

  return api;
};
