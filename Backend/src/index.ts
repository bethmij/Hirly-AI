import express from "express";
import jobRouter from "./api/jobs";
import {connectionDB} from "./infrastructure/db";

const app = express();
app.use(express.json());

connectionDB()

app.use("/jobs",jobRouter)

app.listen(4000, () => console.log("Server is listening on port 4000."));
