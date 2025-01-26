from dataclasses import dataclass

from fastapi import WebSocket


@dataclass
class GameObject:
    token: str
    websocket: WebSocket


@dataclass
class Host(GameObject):
    pass


@dataclass
class Player(GameObject):
    name: str
    color: int
    face: int
    accessory: int
    gm: bool
    thread: list
