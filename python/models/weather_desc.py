from dataclasses import dataclass


@dataclass
class WeatherDesc:
    weather: str  # WEATHER NAME
    description: str  # WEATHER DESCRIPTION
    icon: str  # WEATHER ICON TO USE
