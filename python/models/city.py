from dataclasses import dataclass


@dataclass
class City:
    id: str
    lat: int
    lon: int

    name: str
    country: str
    state: str | None
