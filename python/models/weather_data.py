from dataclasses import dataclass


@dataclass
class WeatherData:
    temp: float
    feels_like: float
    pressure: int
    humidity: int
    visibility: int
