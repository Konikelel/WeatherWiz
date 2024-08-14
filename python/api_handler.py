from os import getenv
from typing import Literal
import uuid

import requests
from models import Location, WeatherCurrent, WeatherData, WeatherDesc, WeatherForecast, Wind, City

API_KEY = getenv("API_KEY")


async def fetchCurrentWeather(lat: float, lon: float):
    response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric")

    if response.status_code != 200:
        print(f"API error: {response.json()}")
        return None

    data = response.json()

    try:

        return WeatherCurrent(
            desc=WeatherDesc(
                name=data["weather"][0]["main"],
                description=data["weather"][0]["description"],
                icon=data["weather"][0]["icon"],
            ),
            data=WeatherData(
                temp=round(data["main"]["temp"]),
                humidity=data["main"]["humidity"],
                pressure=data["main"]["pressure"],
                visibility=data["visibility"] / 1000,
                feels_like=data["main"]["feels_like"],
            ),
            wind=Wind(
                speed=data["wind"]["speed"],
                deg=data["wind"]["deg"],
            ),
            location=Location(
                city=data["name"],
                country=data["sys"]["country"],
                sunrise=data["sys"]["sunrise"] * 1000,
                sunset=data["sys"]["sunset"] * 1000,
            ),
        )
    except KeyError:
        print(f"Invalid data: {data}")
        return None


async def fetchForecast(lat: float, lon: float, interval: Literal["days", "hours"]):
    response = requests.get(f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric")

    if response.status_code != 200:
        print(f"API error: {response.json()}")
        return None

    data = response.json()
    dataList = data["list"][:8] if interval == "hours" else data["list"][::8]
    try:
        return [
            WeatherForecast(
                time=data["dt"] * 1000,
                desc=WeatherDesc(
                    name=data["weather"][0]["main"],
                    description=data["weather"][0]["description"],
                    icon=data["weather"][0]["icon"],
                ),
                data=WeatherData(
                    temp=round(data["main"]["temp"]),
                    humidity=data["main"]["humidity"],
                    pressure=data["main"]["pressure"],
                    visibility=data["visibility"] / 1000,
                    feels_like=data["main"]["feels_like"],
                ),
                wind=Wind(
                    speed=data["wind"]["speed"],
                    deg=data["wind"]["deg"],
                ),
            )
            for data in dataList
        ]
    except KeyError:
        print(f"Invalid data: {dataList}")
        return None

async def fetchCities(city: str):
    response = requests.get(f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit={6}&appid={API_KEY}")

    if response.status_code != 200:
        print(f"API error: {response.json()}")
        return None

    data = response.json()

    try:
        return [
            City(
                id=str(uuid.uuid4()),
                lat=city["lat"],
                lon=city["lon"],
                name=city["name"],
                country=city["country"],
                state=city["state"] if "state" in city else None,
            )
            for city in data
        ]
    except KeyError:
        print(f"Invalid data: {data}")
        return None
