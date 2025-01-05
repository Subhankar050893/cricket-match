import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { DeliveryModel } from "./models/delivery";
import { MatchModel } from "./models/match";

const PORT = 3000;
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/cricket")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
// Route 1: Filter deliveries
app.get("/api/deliveries", async (req: Request, res: Response) => {
  const { over, runs, shotOutcome, dismissalType } = req.query;

  const filter: any = {};
  if (over) filter.over = Number(over);
  if (runs) filter.runs = Number(runs);
  if (shotOutcome) filter.shotOutcome = shotOutcome;
  if (dismissalType) filter.dismissalType = dismissalType;

  try {
    const deliveries = await DeliveryModel.find(filter);
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch deliveries" });
  }
});

// Route 2: Get match data
app.get("/api/match/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const match = await MatchModel.findById(id);
    if (!match) res.status(404).json({ error: "Match not found" });

    const deliveries = await DeliveryModel.find({ matchId: id });
    res.json({ match, deliveries });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch match data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
