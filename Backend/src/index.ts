import "dotenv/config"
import express from "express";
import jobRouter from "./api/jobs";
import {connectionDB} from "./infrastructure/db";
import jobApplicationRouter from "./api/jobApplication";
import cors from "cors"

const app = express();
app.use(express.json());

connectionDB()
app.use(cors())

app.use("/jobs",jobRouter)
app.use("/jobApplication",jobApplicationRouter)

app.listen(4000, () => console.log("Server is listening on port 4000."));
