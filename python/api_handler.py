from os import getenv
from typing import Literal, TypeVar
import uuid

import requests
from helpers import convert_city_dto_city, object_exists_in_list
from models import Location, WeatherCurrent, WeatherData, WeatherDesc, WeatherForecast, Wind, City, CityDTO
from typing import List, Set

API_KEY = getenv("API_KEY")


async def fetch_current_weather(lat: float, lon: float):
    response = requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric")

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


async def fetch_forecast(lat: float, lon: float, interval: Literal["days", "hours"]):
    response = requests.get(
        f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric")

    if response.status_code != 200:
        print(f"API error: {response.json()}")
        return None

    data = response.json()
    data_list = data["list"][:8] if interval == "hours" else data["list"][::8]
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
            for data in data_list
        ]
    except KeyError:
        print(f"Invalid data: {data_list}")
        return None


async def fetch_cities(city: str):
    response = requests.get(f"http://api.openweathermap.org/geo/1.0/direct?q={city}&limit={24}&appid={API_KEY}")

    if response.status_code != 200:
        print(f"API error: {response.json()}")
        return None

    data = response.json()
    try:
        cities_dto = [
            CityDTO(
                lat=city["lat"],
                lon=city["lon"],
                name=city["name"],
                country=city["country"],
                state=city["state"] if "state" in city else None,
            ) for city in data
        ]
    except KeyError:
        print(f"Invalid data: {data}")
        return None

    unique_cities_dto: List[CityDTO] = []
    for city_dto in cities_dto:
        if not object_exists_in_list({"country", "state"}, city_dto, unique_cities_dto):
            unique_cities_dto.append(city_dto)

    return [
        convert_city_dto_city(city_dto, str(uuid.uuid4()))
        for city_dto in unique_cities_dto
    ][:8]
