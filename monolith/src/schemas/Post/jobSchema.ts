import { Schema, model, Document } from "mongoose";
import { z } from "zod";

export interface IJob extends Document {
  companyId: Schema.Types.ObjectId;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  people: number;
  location: string;
  duration: number;
  gender: ("male" | "female" | "other")[];
  type: ("full-time" | "part-time")[];
  available_position: number;
  language: string[];
  deadline: Date;
  salaries: number[];
  createdAt: Date;
}

const JobSchema: Schema = new Schema({
  companyId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], required: true },
  responsibilities: { type: [String], required: true },
  people: { type: Number, required: true },
  location: { type: String, required: true },
  duration: { type: Number, required: true },
  gender: { type: [String], required: true },
  type: { type: [String], required: true },
  available_position: { type: Number, required: true },
  language: { type: [String], required: true },
  deadline: { type: Date, required: true },
  salaries: { type: [Number], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IJob>("Job", JobSchema);

// Zod validation schema
export const JobValidationSchema = z.object({
  companyId: z.string(),
  title: z.string(),
  description: z.string(),
  requirements: z.array(z.string()),
  responsibilities: z.array(z.string()),
  people: z.number(),
  location: z.string(),
  duration: z.number(),
  gender: z.array(z.string()),
  type: z.array(z.string()),
  available_position: z.number(),
  language: z.array(z.string()),
  deadline: z.date(),
  salaries: z.array(z.number()),
  createdAt: z.date(),
});
