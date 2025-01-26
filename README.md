# global-game-jam-2025

This is our game <b>`Who Said That?`</b>

## Server

The server is made in Python using FastAPI. In order to run it you need Python 3.10 installed.

### Steps to run:
- clone the project into a `<folder>`
- `cd <folder>/who-said-that-server`
- `python3.10 -m venv venv`
- `source venv/bin/activate`
- `pip install -r requirements.txt`
- `uvicorn main:app --host 0.0.0.0 --port 8000`
