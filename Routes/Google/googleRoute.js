import { Router } from "express";
import axios from "axios";
import { config as configDotenv } from "dotenv";

configDotenv();

const googleRoute = Router();
const key = process.env.GOOGLE_API_KEY;

const config = {
  headers: {
    'X-Goog-Api-Key': key,
    'X-Goog-FieldMask': '*',
    'Content-Type': 'application/json',
  },
};

googleRoute.post("/api/auto-complete-location", async (req, res) => {
  const { body } = req;
  const { input } = body;
  console.log(input);

  const requestBody = {
    "input": input,
    "locationRestriction": {
      "rectangle": {
        "low": {
          "latitude": -43.39,
          "longitude": 113.09
        },
        "high": {
          "latitude": -10.41,
          "longitude": 153.65
        }
      }
    }
  };

  try {
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:autocomplete",
      requestBody,
      config
    );
    res.status(200).json(response?.data?.suggestions);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

googleRoute.post("/api/getroute", async (req, res) => {
  const { locationOne, locationTwo, timeOfTravel } = req.body;

  const requestBody = {
    "origin": {
      "placeId": locationOne
    }
    ,
    "destination": {
      "placeId": locationTwo
    },
    "travelMode": "DRIVE",
    "routingPreference": "TRAFFIC_AWARE",
    "polylineQuality": "HIGH_QUALITY",
    "extraComputations": "TRAFFIC_ON_POLYLINE",
    // "departureTime": timeOfTravel?.toISOString() || new Date().toISOString()
  }

  try {
    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      requestBody,
      config
    );
    res.status(200).json(response?.data);
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: e.message });
  }
})

export default googleRoute;
