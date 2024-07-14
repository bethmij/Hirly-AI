import "dotenv/config"
import express from "express";
import jobRouter from "./api/jobs";
import {connectionDB} from "./infrastructure/db";
import jobApplicationRouter from "./api/jobApplication";
import cors from "cors"
import GlobalErrorHandlingMiddleware from "./api/middleware/global-error-handler";

const app = express();
app.use(express.json());

connectionDB()
app.use(cors())

app.use("/jobs",jobRouter)
app.use("/jobApplication",jobApplicationRouter)

app.use(GlobalErrorHandlingMiddleware)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
