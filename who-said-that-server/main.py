import json
import random
import uuid

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from constants import OpCodes, PROMPTS
from connection import ConnectionManager
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
HOST: dict = None
PLAYERS: dict = {}

ROUND: int = 0
GAME_LENGTH: int = 0


def _handle_host_registration(data) -> dict:
    global HOST

    token = data.get("token")
    if HOST is None:
        if token:
            return build_response(OpCodes.ERROR, "Y U have token?")
        else:
            token = str(uuid.uuid4())
            HOST = {"name": "HOST", "token": token}
            return build_response(OpCodes.HOST_REGISTRATION_RESPONSE, {"token": token})
    else:
        if token and token == HOST.get("token"):
            return build_response(OpCodes.HOST_REGISTRATION_RESPONSE, {"token": token})
        else:
            return build_response(OpCodes.ERROR, "Host already exists!")


def _handle_player_registration(data, websocket) -> dict:
    global PLAYERS, GAME_LENGTH

    if HOST is None:
        return build_response(OpCodes.ERROR, "There's no host")

    token = data.get("token")
    if token:
        if token in PLAYERS:
            return build_response(
                OpCodes.PLAYER_REGISTRATION_RESPONSE, {"token": token}
            )
        else:
            return build_response(OpCodes.ERROR, "Begone, witch!")
    else:
        token = str(uuid.uuid4())
        gm = len(PLAYERS) == 0
        PLAYERS[token] = {
            "name": "",
            "color": None,
            "face": None,
            "accessory": None,
            "gm": gm,
            "websocket": websocket,
            "thread": [random.choice(PROMPTS)],
        }
        GAME_LENGTH += 1
        return build_response(
            OpCodes.PLAYER_REGISTRATION_RESPONSE, {"token": token, "gm": gm}
        )


def _handle_player_details(data) -> dict:
    global PLAYERS

    token = data.get("token")
    if token is None:
        return build_response(OpCodes.ERROR, "I need a token, dude!")
    if token not in PLAYERS:
        return build_response(OpCodes.ERROR, "Wrong token, my man!")
    PLAYERS[token].update(
        {
            "name": data.get("name"),
            "color": data.get("color"),
            "face": data.get("face"),
            "accessory": data.get("accessory"),
        }
    )
    return None


def _handle_query_players():
    players_list = [
        {
            "token": token,
            "name": p["name"],
            "color": p["color"],
            "face": p["face"],
            "accessory": p["accessory"],
        }
        for token, p in PLAYERS.items()
    ]
    return build_response(OpCodes.PLAYER_POOL, {"players": players_list})


def _handle_broadcast_prompts():
    global ROUND

    if ROUND == GAME_LENGTH:
        return build_response(OpCodes.ERROR, "Gata jocu' boss")
    ROUND += 1

    responses = []
    players = list(PLAYERS.values())
    for index, player in enumerate(players):
        idx = (index - (ROUND - 1)) % len(PLAYERS.keys())
        responses.append(
            {
                "response": build_response(
                    OpCodes.PROMPT_RECEIVED,
                    {"prompt": players[idx]["thread"][ROUND - 1]},
                ),
                "websocket": player["websocket"],
            }
        )
    return responses


def _handle_submit_response(data: str):
    token = data.get("token")
    response = data.get("response")
    indexes = list(PLAYERS.keys())
    players = list(PLAYERS.values())
    if token in indexes:
        current_player = indexes.index(token)
    else:
        return
    idx = (current_player - (ROUND - 1)) % len(players)
    players[idx]["thread"].append(response)


def _handle_get_chats():
    resp = [{"playerToken": t, "thread": p["thread"]} for t, p in PLAYERS.items()]
    return build_response(OpCodes.CHATS_RECEIVED, {"chats": resp})


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
            return _handle_host_registration(data)
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
