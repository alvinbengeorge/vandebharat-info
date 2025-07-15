from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

DATA_ROUTE = "http://vandebharat.myinfotain.com/assets/pis/routedata.txt"

@app.get("/")
async def read_root():
    response = requests.get(DATA_ROUTE)
    data = dict(zip(['date', 'time', 'speed', 'something', 'something else', 'distance remaining'], response.text.splitlines()))
    return {"test": "Hello World", "data": data}