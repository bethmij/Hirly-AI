import express from "express";
import {getApplications, saveApplications} from "../application/jobApplication";

const jobApplicationRouter = express.Router()

jobApplicationRouter.route("/").get(getApplications).post(saveApplications)

export default jobApplicationRouter