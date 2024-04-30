"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getAllJobs = exports.createJob = void 0;
const jobRepository_1 = require("../../repository/Post/jobRepository");
const jobRepository = new jobRepository_1.JobRepository();
const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = req.body;
        const createdJob = yield jobRepository.createJob(job);
        res
            .status(201)
            .json({ message: "Job created successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.createJob = createJob;
const getAllJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield jobRepository.getAllJobs();
        res.status(200).json(jobs);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllJobs = getAllJobs;
const getJobById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const job = yield jobRepository.getJobById(id);
        if (!job) {
            res.status(404).json({ message: "Job not found" });
        }
        else {
            res.status(200).json(job);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getJobById = getJobById;
const updateJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const job = req.body;
        const updatedJob = yield jobRepository.updateJob(id, job);
        if (!updatedJob) {
            res.status(404).json({ message: "Job not found" });
        }
        else {
            res
                .status(200)
                .json({ message: "Job updated successfully" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateJob = updateJob;
const deleteJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedJob = yield jobRepository.deleteJob(id);
        if (!deletedJob) {
            res.status(404).json({ message: "Job not found" });
        }
        else {
            res.status(204).json({ message: "Job deleted successfully" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJob = deleteJob;
