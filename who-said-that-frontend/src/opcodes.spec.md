# "Who Said That" Netcode

## WS Message Structure

- JSON payloads

```json
{
    "op": "opcode-goes-here",
    // Optional, only for opcodes that need extra data
    "data": [any]
}
```

## Opcodes

```ts
enum Opcodes {
  // Test opcode to confirm communication is working correctly
  // Server is expected to return 'polo'
  MARCO = "marco",
  // Test opcode to confirm communication is working correctly
  // Sent as a reply to 'marco'
  POLO = "polo",
  // Sent by the host app when a new session should start
  // Server clears the game state and awaits further instructions
  REGISTER_HOST = "register-host"
}
```
