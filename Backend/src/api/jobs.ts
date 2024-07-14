import express from "express";
import {deleteJob, getAllJobs, getJobById, postJobs, updateJob} from "../application/jobs";
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node";

const jobRouter = express.Router()

jobRouter.route("/").get(getAllJobs).post(ClerkExpressRequireAuth({}),postJobs)

jobRouter.route("/:_id").get(ClerkExpressRequireAuth({}), getJobById).delete(deleteJob).put(updateJob)

export default jobRouter