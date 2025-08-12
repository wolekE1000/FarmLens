from fastapi import APIRouter, Query
from datetime import date

router = APIRouter(prefix="/api/solar", tags=["solar"])

@router.get("/forecast")
def solar_forecast(lat: float = Query(...), lon: float = Query(...), capacity_kw: float = Query(1.0)):
    """
    Return sunrise, sunset and estimated generation for given location and capacity.
    Currently returns placeholder values.
    """
    sunrise = "06:00"
    sunset = "18:00"
    daylight_hours = 12  # difference between sunrise and sunset
    est_kwh = capacity_kw * daylight_hours * 0.75
    return {"date": date.today().isoformat(), "sunrise": sunrise, "sunset": sunset, "est_generation_kWh": round(est_kwh, 2)}
