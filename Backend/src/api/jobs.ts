import express from "express";
import {deleteJob, getAllJobs, getJobById, postJobs, updateJob} from "../application/jobs";

const jobRouter = express.Router()

jobRouter.route("/").get(getAllJobs).post(postJobs)

jobRouter.route("/:_id").get(getJobById).delete(deleteJob).put(updateJob)

export default jobRouter