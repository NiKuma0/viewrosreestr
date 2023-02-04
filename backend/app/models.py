import re

from pydantic import BaseModel, validator


def clean_nested_lists(value: list):
    if (
        isinstance(value, list)
        and len(value) == 1
        and isinstance(value[0], list)
    ):
        return clean_nested_lists(value[0])
    return value


class ReestrCoord(BaseModel):
    coordinates: list[list[float | int]]
    center: list[float | int]

    @validator('center', 'coordinates', pre=True)
    def reverse_and_clean(cls, v: list):
        v = clean_nested_lists(v)
        if isinstance(v[0], list) and len(v) > 0:
            for nested in v:
                nested.reverse()
        else:
            v.reverse()
        return v
