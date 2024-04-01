from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Mount the templates directory
templates = Jinja2Templates(directory="templates")

# Route to serve the index.html file
@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Mount the static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# use: uvicorn main:app