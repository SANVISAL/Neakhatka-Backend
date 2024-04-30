import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../../controller/Post/jobController";

const jobRouter = express.Router();

jobRouter.post("/job", createJob);
jobRouter.get("/job", getAllJobs);
jobRouter.get("/job/:id", getJobById);
jobRouter.put("/job/:id", updateJob);
jobRouter.delete("/job/:id", deleteJob);

export default jobRouter;
