from dataclasses import dataclass


@dataclass
class Location:
    city: str  # CITY NAME
    country: str  # COUNTRY ID

    sunrise: int
    sunset: int
