"""
Main FastAPI application for the FarmLens backend.

This module creates the FastAPI app, adds CORS support so that the
frontend can call the API from a different origin, and wires up
routers for the prediction and solar endpoints. A root endpoint is
provided for a basic health check.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import predict, solar


def create_app() -> FastAPI:
    """Create and configure the FastAPI application.

    Returns
    -------
    FastAPI
        The configured FastAPI instance.
    """
    app = FastAPI(title="FarmLens API", version="0.1.0")

    # Enable CORS for all origins to allow the React Native frontend
    # and the web version to access the API from different domains.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include API routers under the /api prefix
    app.include_router(predict.router, prefix="/api", tags=["Predict"])
    app.include_router(solar.router, prefix="/api", tags=["Solar"])

    @app.get("/")
    async def read_root() -> dict:
        """Health check endpoint.

        Returns
        -------
        dict
            A simple message indicating that the API is running.
        """
        return {"message": "FarmLens API is running"}

    return app


# When run directly (e.g. `uvicorn backend.app:app --reload`) the app
# will be created via this module-level variable.
app = create_app()
