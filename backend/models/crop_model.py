"""Crop model stub module for FarmLens backend.
This module defines a placeholder prediction function for crop health analysis.
"""


def predict(image):
    """
    Analyze a crop image and return a predicted status and confidence.

    This placeholder implementation always returns "healthy" with 0.99 confidence.
    Replace this with an actual machine learning model for production.

    Args:
        image: A PIL Image or array representing the crop image.

    Returns:
        Tuple[str, float]: A tuple containing the health status and confidence score.
    """
    status = "healthy"
    confidence = 0.99
    return status, confidence
