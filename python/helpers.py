from typing import TypeVar, List, Set

from models import City, CityDTO

T = TypeVar(name="T", bound=object)


def convert_city_dto_city(dto: CityDTO, id_str: str) -> City:
    return City(
        id=id_str,
        lat=dto.lat,
        lon=dto.lon,
        name=dto.name,
        country=dto.country,
        state=dto.state,
    )


def object_exists_in_list(attrs: Set[str], check: T, items: List[T]):
    for attr in attrs:
        if not hasattr(check, attr):
            raise Exception(f"Object {check} has no attribute {attr}")

    for item in items:
        objects_attr_match = [getattr(item, attr) == getattr(check, attr) for attr in attrs]
        if all(objects_attr_match):
            return True

    return False
