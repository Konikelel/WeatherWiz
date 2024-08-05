from dataclasses import dataclass


@dataclass
class WeatherDesc:
    name: str  # WEATHER NAME
    description: str  # WEATHER DESCRIPTION
    icon: str  # WEATHER ICON TO USE
