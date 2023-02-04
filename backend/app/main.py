import uvicorn
from fastapi import FastAPI, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from rosreestr2coord import Area

from .settings import Settings
from .models import ReestrCoord


settings = Settings()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)


@app.get('/api/v1/reestr/{reestr_id}')
def get_reestr(
    reestr_id: str = Query(
        min_length=15,
        max_length=50,
        regex=r'^\d+\:\d+\:\d{6,7}\:\d+$',
    )
) -> ReestrCoord:
    """Возвращает координаты области участка.

    Args:
        reestr (str): Кадастровый номер

    Returns:
        ReestrCoord: Координаты участка
    """
    area = Area(reestr_id, use_cache=True, with_proxy=True)
    if not area:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Reestr not found'
        )
    coordinates = area.get_geometry()
    center = area.get_center_xy()
    if not coordinates or not center:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Reestr not found'
        )
    return dict(
        coordinates=coordinates,
        center=center,
    )


def main():
    uvicorn.run(app, host='0.0.0.0', port=8000)


if __name__ == '__main__':
    main()
