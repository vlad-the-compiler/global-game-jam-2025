# global-game-jam-2025

This is our game <b>`Who Said That?`</b>
To get it working, clone the project in a `<folder>`.

## Server

The server is made in Python using FastAPI. In order to run it you need Python 3.10 installed.

### Steps to run:

- `cd <folder>/who-said-that-server`
- `python3.10 -m venv venv`
- `source venv/bin/activate`
- `pip install -r requirements.txt`
- `uvicorn main:app --host 0.0.0.0 --port 8000`

## Client

The client is a React app and has two services: a Host that controls the game and a Client which represents each player.
In order to run the client, you need npm installed.

### Steps to run

- `cd <folder>/who-said-that-frontend`
- `npm install`
- `npm run dev`
- In a browser go to `localhost:3000/host` to start a game host
- Each player can scan the generated QR code to join
- The first player to join can start the game
