# FarmLens

FarmLens is an AI‑powered farm monitoring application designed to help
small and mid‑sized farmers manage crop health, livestock wellbeing and
solar energy generation from a single, easy‑to‑use interface. The
project is built as a cross‑platform solution: a Python backend
implemented with FastAPI provides API endpoints for image analysis and
solar forecasts, while a React Native frontend (Expo) delivers a
mobile/web app that works offline and synchronises data when
connectivity is available.

This repository is organised as a monorepo with two main
subdirectories:

* `backend/` — Contains the FastAPI server with endpoints for crop and
  livestock predictions and solar energy estimates. Models are stub
  implementations that return placeholder responses. You can replace
  them with real ML models later.
* `frontend/` — Contains the React Native (Expo) application code. The
  frontend provides a dashboard with three modules (Crops, Livestock,
  Solar), image upload forms and displays results from the API. The
  Expo app can be built for Android, iOS and web.

## Running the backend

1. Change into the `backend` directory: `cd backend`.
2. Create a virtual environment (optional but recommended):

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the API server:

   ```bash
   uvicorn backend.app:app --reload --port 8000
   ```

5. The API will be available at `http://localhost:8000`. Visit
   `http://localhost:8000/docs` to see the automatically generated
   OpenAPI documentation.

## Running the frontend (development)

The frontend is built with Expo, which provides a convenient
environment to develop and test React Native apps. To set it up, you
will need Node.js and npm.

1. Change into the `frontend` directory: `cd frontend`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and adjust the `EXPO_PUBLIC_API_BASE`
   to point to your backend (e.g. `http://localhost:8000`). You can
   also add your Firebase configuration here.

4. Start the development server:

   ```bash
   npx expo start
   ```

5. Use the Expo CLI to run the app on the web (`w`), an Android
   emulator/physical device (`a`) or an iOS simulator/physical device
   (`i`).

## Notes

* The prediction models in this repository are placeholders. For a
  production app, you should integrate real machine learning models
  (e.g. using TensorFlow, PyTorch or ONNX) and update the prediction
  functions accordingly.
* This project uses very permissive CORS settings to simplify
  development. In a production deployment you should restrict CORS to
  trusted domains.
* You can extend the solar forecasting logic with actual weather data
  or more sophisticated solar modelling libraries.

Contributions are welcome! Feel free to open issues or submit pull
requests to enhance FarmLens.
