from dotenv import load_dotenv
from typing import Annotated, Literal
import uvicorn
from fastapi import FastAPI, HTTPException, Query

load_dotenv(override=True)

from api_handler import fetchAirPollution, fetchCurrentWeather, fetchForecast

app = FastAPI()


@app.get("/")
async def ping():
    return {"message": "Hello World"}


@app.get("/weather/current")
async def current_weather(
    city: Annotated[str, Query(description="Name of the city to get weather data", min_length=1, max_length=30)]
):
    weather = await fetchCurrentWeather(city=city)

    if not weather:
        raise HTTPException(status_code=400, detail="Could not fetch weather data from API")

    return weather


@app.get("/weather/forecast")
async def forecast_weather(
    city: Annotated[str, Query(description="Name of the city to get weather data", min_length=1, max_length=30)],
    interval: Annotated[Literal["days", "hours"], Query(description="Interval of forecast data")],
):
    weather = await fetchForecast(city=city, interval=interval)

    if not weather:
        raise HTTPException(status_code=400, detail="Could not fetch weather data from API")

    return weather


@app.get("/pollution")
async def pollution_weather(
    city: Annotated[str, Query(description="Name of the city to get pollution data", min_length=1, max_length=30)]
):
    weather = await fetchAirPollution(city=city)

    if not weather:
        raise HTTPException(status_code=400, detail="Could not fetch weather data from API")

    return weather


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
