from os import getenv
from typing import Literal

import requests
from models import AirPollution, Location, WeatherCurrent, WeatherData, WeatherDesc, WeatherForecast, Wind

API_KEY = getenv("API_KEY")


async def fetchCurrentWeather(city: str):
    response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric")

    if response.status_code != 200:
        print(f"API error: {response.json()}")
        return None

    data = response.json()

    try:

        return WeatherCurrent(
            desc=WeatherDesc(
                weather=data["weather"][0]["main"],
                description=data["weather"][0]["description"],
                icon=data["weather"][0]["icon"],
            ),
            data=WeatherData(
                temp=data["main"]["temp"],
                humidity=data["main"]["humidity"],
                pressure=data["main"]["pressure"],
                visibility=data["visibility"],
                feels_like=data["main"]["feels_like"],
            ),
            wind=Wind(
                speed=data["wind"]["speed"],
                deg=data["wind"]["deg"],
            ),
            location=Location(
                city=data["name"],
                country=data["sys"]["country"],
                sunrise=data["sys"]["sunrise"],
                sunset=data["sys"]["sunset"],
            ),
        )
    except KeyError:
        print(f"Invalid data: {data}")
        return None


async def fetchForecast(city: str, interval: Literal["days", "hours"]):
    response = requests.get(f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric")

    if response.status_code != 200:
        print(f"API error: {response.json()}")
        return None

    data = response.json()
    dataList = data["list"][:8] if interval == "hours" else data["list"][::8]
    try:
        return [
            WeatherForecast(
                time=data["dt"],
                desc=WeatherDesc(
                    weather=data["weather"][0]["main"],
                    description=data["weather"][0]["description"],
                    icon=data["weather"][0]["icon"],
                ),
                data=WeatherData(
                    temp=data["main"]["temp"],
                    humidity=data["main"]["humidity"],
                    pressure=data["main"]["pressure"],
                    visibility=data["visibility"],
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


async def fetchAirPollution(city: str):
    response = requests.get(
        f"https://api.openweathermap.org/data/2.5/air_pollution?q={city}&appid={API_KEY}&units=metric"
    )

    if response.status_code != 200:
        print(f"API error: {response.json()}")
        return None

    data = response.json()
    try:
        return AirPollution(
            pm2_5=data["list"][0]["components"]["pm2_5"],
            so2=data["list"][0]["components"]["so2"],
            no2=data["list"][0]["components"]["no2"],
            o3=data["list"][0]["components"]["o3"],
        )
    except KeyError:
        print(f"Invalid data: {data}")
        return None
