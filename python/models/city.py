from dataclasses import dataclass


@dataclass
class CityDTO:
    lat: float
    lon: float

    name: str
    country: str
    state: str | None


@dataclass
class City(CityDTO):
    id: str
