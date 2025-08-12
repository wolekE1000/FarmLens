"""Livestock model stub for FarmLens backend.
This module defines a placeholder prediction function for livestock health analysis.
"""


def predict(image, species: str):
    """
    Analyze a livestock image and return a health label.

    This placeholder implementation always returns "healthy".
    Replace this with an actual machine learning model for production.

    Args:
        image: A PIL Image or array representing the livestock image.
        species (str): The species of the animal (e.g., 'cow', 'chicken', 'sheep').

    Returns:
        str: The predicted health label, such as "healthy" or "needs_attention".
    """
    return "healthy"
