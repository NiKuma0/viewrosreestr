from pydantic import BaseSettings, AnyUrl


class Settings(BaseSettings):
    geoapify_host: AnyUrl = 'https://maps.geoapify.com/v1/'
    geoapify_token: str = '6ce1009e85ff4f8888e5472896ebd57d'
    default_polygon: list[str | float | int] = [89.80059530838025, 55.33131506353899, 89.80054953023337, 55.33125997891148, 89.80119922777946, 55.331097729200074, 89.8012432452284, 55.331147806342386, 89.80059530838025, 55.33131506353899]
    origins: list[str] = [
        "http://localhost:8000",
        "http://localhost:3000"
    ]
