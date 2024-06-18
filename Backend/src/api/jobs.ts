import express from "express";
import {deleteJob, getJob, getJobs, postJobs, updateJob} from "../application/jobs";

const jobRouter = express.Router()

jobRouter.route("/").get(getJobs).post(postJobs)

jobRouter.route("/:_id").get(getJob).delete(deleteJob).put(updateJob)

export default jobRouter