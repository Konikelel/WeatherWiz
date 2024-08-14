from dotenv import load_dotenv
from typing import Annotated, Literal
import uvicorn
from os import getenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(override=True)

from api_handler import fetchCurrentWeather, fetchForecast, fetchCities

app = FastAPI()
origin = getenv("ORIGIN")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin],
    allow_methods=["GET"],
)


@app.get("/")
async def ping():
    return {"message": "Hello World"}


@app.get("/weather/current")
async def current_weather(
    lat: Annotated[float, Query(description="Latitude", ge=-90, le=90)],
    lon: Annotated[float, Query(description="Longitude", ge=-180, le=180)],
):
    data = await fetchCurrentWeather(lat=lat, lon=lon)

    if not data:
        raise HTTPException(status_code=400, detail="Could not fetch weather data from API")

    return data


@app.get("/weather/forecast")
async def forecast_weather(
    lat: Annotated[float, Query(description="Latitude", ge=-90, le=90)],
    lon: Annotated[float, Query(description="Longitude", ge=-180, le=180)],
    interval: Annotated[Literal["days", "hours"], Query(description="Interval of forecast data")],
):
    data = await fetchForecast(lat=lat, lon=lon, interval=interval)

    if not data:
        raise HTTPException(status_code=400, detail="Could not fetch weather data from API")

    return data

@app.get("/cities")
async def cities(
        city: Annotated[str, Query(description="Name of the city to search", min_length=1, max_length=30)],
):
    data = await fetchCities(city=city)

    if not data:
        raise HTTPException(status_code=400, detail="Could not fetch cities data from API")

    return data


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
