"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobValidationSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const JobSchema = new mongoose_1.Schema({
    companyId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
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
exports.default = (0, mongoose_1.model)("Job", JobSchema);
// Zod validation schema
exports.JobValidationSchema = zod_1.z.object({
    companyId: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    requirements: zod_1.z.array(zod_1.z.string()),
    responsibilities: zod_1.z.array(zod_1.z.string()),
    people: zod_1.z.number(),
    location: zod_1.z.string(),
    duration: zod_1.z.number(),
    gender: zod_1.z.array(zod_1.z.string()),
    type: zod_1.z.array(zod_1.z.string()),
    available_position: zod_1.z.number(),
    language: zod_1.z.array(zod_1.z.string()),
    deadline: zod_1.z.date(),
    salaries: zod_1.z.array(zod_1.z.number()),
    createdAt: zod_1.z.date(),
});
