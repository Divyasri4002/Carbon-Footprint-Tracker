const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory history
let history = [];

// POST /api/calculate → calculate & store entry
app.post("/api/calculate", (req, res) => {
  const { travelKm = 0, electricityKWh = 0, plasticItems = 0 } = req.body || {};

  // Per-category contributions (kg CO2)
  const travelCO2 = Number(travelKm) * 0.12;
  const electricityCO2 = Number(electricityKWh) * 0.5;
  const plasticCO2 = Number(plasticItems) * 0.3;

  // Total CO₂ footprint
  const totalCO2 = travelCO2 + electricityCO2 + plasticCO2;

  // Emoji feedback
  let status = "Good", emoji = "😀";
  if (totalCO2 >= 5 && totalCO2 < 15) {
    status = "Average"; emoji = "😐";
  } else if (totalCO2 >= 15) {
    status = "Bad"; emoji = "😟";
  }

  const entry = {
    date: new Date().toISOString().split("T")[0],
    totalCO2,
    status,
    emoji,
    breakdown: {
      travelCO2,
      electricityCO2,
      plasticCO2
    }
  };

  history.push(entry);

  res.json(entry);
});

// GET /api/history → return all logs
app.get("/api/history", (req, res) => {
  res.json(history);
});

app.listen(PORT, () => {
  console.log(`✅ Express API running at http://localhost:${PORT}`);
});
