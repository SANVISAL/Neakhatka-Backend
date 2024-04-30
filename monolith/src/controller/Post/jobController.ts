import { Request, Response, NextFunction } from "express";
import { JobRepository } from "../../repository/Post/jobRepository";
import { IJob } from "../../model/Post/Job";

const jobRepository = new JobRepository();

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const job: IJob = req.body;
    const createdJob = await jobRepository.createJob(job);
    res
      .status(201)
      .json({ message: "Job created successfully"});
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobs = await jobRepository.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const job = await jobRepository.getJobById(id);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
    } else {
      res.status(200).json(job);
    }
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const job: IJob = req.body;
    const updatedJob = await jobRepository.updateJob(id, job);
    if (!updatedJob) {
      res.status(404).json({ message: "Job not found" });
    } else {
      res
        .status(200)
        .json({ message: "Job updated successfully"});
    }
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedJob = await jobRepository.deleteJob(id);
    if (!deletedJob) {
      res.status(404).json({ message: "Job not found" });
    } else {
      res.status(201).json({ message: "Job deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};
