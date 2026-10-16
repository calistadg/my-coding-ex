
from fastapi import FastAPI, Request, Response
from starlette.middleware.base import BaseHTTPMiddleware


class FuelSensorMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, jalan):

        # 1. BEFORE DRIVING (Authentication & Safety)
        fuel_level_empty = False
        print("SENSOR: Checking fuel level before ignition...")
        if fuel_level_empty:
            print("SENSOR: Tank is empty. Kenot start!")
            return Response(content="Error: Out of fuel", status_code=401)

        # 2. DURING DRIVING
        # If fuel is not empty, we can jalan
        trip_result = await jalan(request)

        # 3. AFTER REACHING (Logging)
        print("SENSOR: Trip finished. Logging fuel economy to dashboard.")
        return trip_result


app = FastAPI()
app.add_middleware(FuelSensorMiddleware)
