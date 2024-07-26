from dataclasses import dataclass


@dataclass
class AirPollution:
    pm2_5: float
    so2: float
    no2: float
    o3: float
