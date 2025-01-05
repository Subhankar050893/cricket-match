import mongoose, { Document, Schema } from "mongoose";

interface Score {
  team: string;
  totalRuns: number;
  wickets: number;
}

interface Delivery extends Document {
  matchId: mongoose.Types.ObjectId;
  inning: number;
  over: number;
  ball: number;
  batter: string;
  bowler: string;
  runs: number;
  shotOutcome: string;
  dismissalType: string;
  extraType: string;
  score: Score;
  currentRunRate: number;
  target: number;
  videoUrl: string;
}

const deliverySchema = new Schema<Delivery>({
  matchId: { type: mongoose.Schema.Types.ObjectId, required: true },
  inning: { type: Number, required: true },
  over: { type: Number, required: true },
  ball: { type: Number, required: true },
  batter: { type: String, required: true },
  bowler: { type: String, required: true },
  runs: { type: Number, required: true },
  shotOutcome: { type: String, required: true },
  dismissalType: { type: String, required: true },
  extraType: { type: String, required: true },
  score: {
    team: { type: String, required: true },
    totalRuns: { type: Number, required: true },
    wickets: { type: Number, required: true },
  },
  currentRunRate: { type: Number, required: true },
  target: { type: Number, required: true },
  videoUrl: { type: String, required: true },
});

export const DeliveryModel = mongoose.model<Delivery>(
  "Delivery",
  deliverySchema
);
