import mongoose, { Document, Schema } from "mongoose";

interface Score {
  team1: {
    name: string;
    runs: number;
    wickets: number;
    overs: number;
  };
  team2: {
    name: string;
    runs: number;
    wickets: number;
    overs: number;
  };
}

interface BattingStats {
  player: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
}

interface BowlingStats {
  player: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
}

interface Match extends Document {
  matchName: string;
  teams: string[];
  venue: string;
  date: Date;
  result: string;
  score: Score;
  milestones: string[];
  playerOfTheMatch: string;
  battingStats: BattingStats[];
  bowlingStats: BowlingStats[];
}

const matchSchema = new Schema<Match>({
  matchName: { type: String, required: true },
  teams: { type: [String], required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  result: { type: String, required: true },
  score: {
    team1: {
      name: { type: String, required: true },
      runs: { type: Number, required: true },
      wickets: { type: Number, required: true },
      overs: { type: Number, required: true },
    },
    team2: {
      name: { type: String, required: true },
      runs: { type: Number, required: true },
      wickets: { type: Number, required: true },
      overs: { type: Number, required: true },
    },
  },
  milestones: { type: [String], required: true },
  playerOfTheMatch: { type: String, required: true },
  battingStats: [
    {
      player: { type: String, required: true },
      runs: { type: Number, required: true },
      balls: { type: Number, required: true },
      fours: { type: Number, required: true },
      sixes: { type: Number, required: true },
    },
  ],
  bowlingStats: [
    {
      player: { type: String, required: true },
      overs: { type: Number, required: true },
      maidens: { type: Number, required: true },
      runs: { type: Number, required: true },
      wickets: { type: Number, required: true },
    },
  ],
});

export const MatchModel = mongoose.model<Match>("Match", matchSchema);
