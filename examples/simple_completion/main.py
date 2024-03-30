from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import os

app = FastAPI()

def read_root():
    with open('static/index.html', 'r') as f:
        return HTMLResponse(content=f.read(), media_type="text/html")

@app.get("/")
def main():
    return read_root()
