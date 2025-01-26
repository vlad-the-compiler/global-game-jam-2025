import json
import random
import uuid
from dataclasses import replace

from connection import ConnectionManager
from constants import PROMPTS, OpCodes
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from game import Host, Player
from utils import build_response

app = FastAPI()

# Allow CORS for communication with the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

manager = ConnectionManager()
HOST: Host = None
PLAYERS: list[Player] = []

ROUND: int = 0
GAME_LENGTH: int = 0
GAME_STARTED: bool = False
GAME_ENDED: bool = False
_PROMPTS: list = random.sample(PROMPTS, len(PROMPTS))


def reset_game(websocket):
    global HOST, PLAYERS, ROUND, GAME_LENGTH, _PROMPTS, GAME_ENDED, GAME_STARTED

    HOST = None
    PLAYERS = []
    ROUND = GAME_LENGTH = 0
    GAME_STARTED = False
    GAME_ENDED = False
    _PROMPTS = random.sample(PROMPTS, len(PROMPTS))

    for connection in manager.active_connections:
        if connection != websocket:
            manager.active_connections.remove(connection)


def _handle_host_registration(data, websocket) -> dict:
    global HOST

    token = data.get("token")
    if HOST is None:
        if token:
            return build_response(OpCodes.ERROR, "Y U have token?")
        else:
            token = str(uuid.uuid4())
            HOST = Host(token=token, websocket=websocket)
            return build_response(OpCodes.HOST_REGISTRATION_RESPONSE, {"token": token})
    else:
        if token:
            if token == HOST.token:
                response = build_response(
                    OpCodes.HOST_REGISTRATION_RESPONSE, {"token": token}
                )
                if GAME_ENDED:
                    response = [{"response": response, "websocket": websocket}]
                    response.append(
                        {
                            "response": build_response(OpCodes.GAME_END),
                            "websocket": websocket,
                        }
                    )
                return response
            else:
                return build_response(OpCodes.ERROR, "Host already exists!")
        else:
            reset_game(websocket)
            token = str(uuid.uuid4())
            HOST = Host(token=token, websocket=websocket)
            return build_response(OpCodes.HOST_REGISTRATION_RESPONSE, {"token": token})


def _handle_player_registration(data, websocket) -> dict:
    global PLAYERS, GAME_LENGTH, _PROMPTS

    if HOST is None:
        return build_response(OpCodes.ERROR, "There's no host")

    token = data.get("token")
    if token:
        if len([p for p in PLAYERS if p.token == token]):
            response = build_response(
                OpCodes.PLAYER_REGISTRATION_RESPONSE, {"token": token}
            )
            if GAME_ENDED:
                response = [{"response": response, "websocket": websocket}]
                response.append(
                    {
                        "response": build_response(OpCodes.GAME_END),
                        "websocket": websocket,
                    }
                )
            return response
        else:
            return build_response(OpCodes.ERROR, "Begone, witch!")
    else:
        if GAME_STARTED:
            return build_response(OpCodes.ERROR, "Game already started")
        token = str(uuid.uuid4())
        gm = len(PLAYERS) == 0
        prompt, _PROMPTS = _PROMPTS[0], _PROMPTS[1:]
        PLAYERS.append(
            Player(
                token=token,
                websocket=websocket,
                name="",
                color=None,
                face=None,
                accessory=None,
                gm=gm,
                thread=[prompt],
            )
        )
        GAME_LENGTH += 1
        return build_response(
            OpCodes.PLAYER_REGISTRATION_RESPONSE, {"token": token, "gm": gm}
        )


def _handle_player_details(data) -> dict:
    global PLAYERS

    token = data.pop("token")
    if token is None:
        return build_response(OpCodes.ERROR, "I need a token, dude!")

    player = [p for p in PLAYERS if p.token == token]
    if len(player) == 0:
        return build_response(OpCodes.ERROR, "Wrong token, my man!")

    index = PLAYERS.index(player[0])
    PLAYERS[index] = replace(PLAYERS[index], **data)
    return None


def _handle_query_players():
    return build_response(
        OpCodes.PLAYER_POOL,
        {
            "players": [
                {
                    "token": player.token,
                    "name": player.name,
                    "color": player.color,
                    "face": player.face,
                    "accessory": player.accessory,
                }
                for player in PLAYERS
            ]
        },
    )


def _handle_broadcast_prompts():
    global ROUND, GAME_STARTED

    if GAME_STARTED is False:
        GAME_STARTED = True
    if ROUND == GAME_LENGTH:
        return build_response(OpCodes.ERROR, "Gata jocu' boss")
    ROUND += 1

    responses = []
    for index, player in enumerate(PLAYERS):
        idx = (index - (ROUND - 1)) % len(PLAYERS)
        responses.append(
            {
                "response": build_response(
                    OpCodes.PROMPT_RECEIVED,
                    {"prompt": PLAYERS[idx].thread[ROUND - 1]},
                ),
                "websocket": player.websocket,
            }
        )
    return responses


def _handle_submit_response(data: str):
    token = data.get("token")
    response = data.get("response")
    index = next((i for i, p in enumerate(PLAYERS) if p.token == token), None)
    if index is None:
        return
    idx = (index - (ROUND - 1)) % len(PLAYERS)
    PLAYERS[idx].thread.append(response)


def _handle_get_chats():
    resp = [{"playerToken": p.token, "thread": p.thread} for p in PLAYERS]
    return build_response(OpCodes.CHATS_RECEIVED, {"chats": resp})


def _handle_advance_game():
    return [
        {
            "response": build_response(OpCodes.ADVANCE_GAME),
            "websocket": HOST.websocket,
        }
    ]


def _handle_game_end():
    global GAME_ENDED

    GAME_ENDED = True
    responses = []
    for player in PLAYERS:
        responses.append(
            {
                "response": build_response(OpCodes.GAME_END),
                "websocket": player.websocket,
            }
        )
    return responses


def handle_incoming(data: str, websocket: WebSocket) -> dict:
    try:
        json_data = json.loads(data)
    except json.JSONDecodeError:
        return build_response(OpCodes.ERROR, "Invalid message received")
    op_code = json_data.get("op")
    if not op_code:
        return build_response(OpCodes.ERROR, "Gimme an op code")
    data = json_data.get("data", {})
    match op_code:
        case OpCodes.MARCO.value:
            return build_response(OpCodes.POLO)
        case OpCodes.REGISTER_HOST.value:
            return _handle_host_registration(data, websocket)
        case OpCodes.REGISTER_PLAYER.value:
            return _handle_player_registration(data, websocket)
        case OpCodes.REGISTER_PLAYER_DETAILS.value:
            return _handle_player_details(data)
        case OpCodes.QUERY_PLAYER_POOL.value:
            return _handle_query_players()
        case OpCodes.BROADCAST_PROMPTS.value:
            return _handle_broadcast_prompts()
        case OpCodes.SUBMIT_RESPONSE.value:
            return _handle_submit_response(data)
        case OpCodes.GET_CHATS.value:
            return _handle_get_chats()
        case OpCodes.ADVANCE_GAME.value:
            return _handle_advance_game()
        case OpCodes.GAME_END.value:
            return _handle_game_end()
        case _:
            return build_response(OpCodes.ERROR, "I don't understand your magic words")


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            response = handle_incoming(data, websocket)
            if json.loads(data)["op"] in [
                OpCodes.REGISTER_PLAYER_DETAILS.value,
                OpCodes.REGISTER_PLAYER.value,
            ]:
                await manager.broadcast(json.dumps(_handle_query_players()))
            if type(response) == list:
                for r in response:
                    await manager.send_message(
                        r["websocket"], json.dumps(r["response"])
                    )
            elif response:
                await manager.send_message(websocket, json.dumps(response))
                if response["op"] == OpCodes.ERROR.value:
                    if websocket in manager.active_connections:  # WHY?
                        manager.disconnect(websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
