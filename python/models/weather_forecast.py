from dataclasses import dataclass
from typing import List

from .location import Location
from .weather_forecast_item import WeatherForecastItem


@dataclass
class WeatherForecast:
    location: Location
    data: List[WeatherForecastItem]
