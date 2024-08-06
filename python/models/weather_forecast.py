from dataclasses import dataclass

from .weather_data import WeatherData
from .weather_desc import WeatherDesc
from .wind import Wind

@dataclass
class WeatherForecast:
    time: int
    desc: WeatherDesc

    data: WeatherData
    wind: Wind