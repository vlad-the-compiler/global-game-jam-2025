export enum MultiplayerOpcodes {
  MARCO = "marco",
  POLO = "polo",
  ERROR = "error",
  REGISTER_HOST = "register-host",
  HOST_REGISTRATION_RESPONSE = "host-registration-response",
  REGISTER_PLAYER = "register-player",
  PLAYER_REGISTRATION_RESPONSE = "player-registration-response",
  REGISTER_PLAYER_DETAILS = "register-player-details",
  QUERY_PLAYER_POOL = "query-player-pool",
  PLAYER_POOL = "player-pool",
  BROADCAST_PROMPTS = "broadcast-prompts",
  PROMPT_RECEIVED = "prompt-received",
  SUBMIT_RESPONSE = "submit-response",
  GET_CHATS = "get-chats",
  CHATS_RECEIVED = "chats-received"
}
