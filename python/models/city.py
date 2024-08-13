from dataclasses import dataclass


@dataclass
class City:
    name: str
    country: str
    state: str | None
