import express, {Request, Response} from "express";

const app = express();
app.use(express.json());

const jobs = [
    {
        _id:"1",
        title:"Intern Software Engineer",
        type:"Full Time",
        location:"remote"
    },
    {
        _id:"2",
        title:"Cloud Solution Engineer",
        type:"Full Time",
        location:"Colombo, Sri Lanka"
    }
]

const getJobs = (req:Request,res:Response) => {
    res.json(jobs)
}

const postJobs = (req:Request, res:Response) => {
    const reqBody = req.body;
    jobs.push(reqBody)
    res.send("Job Saved")
}

const getJob = (req:Request, res:Response) => {
    const job = jobs.find(job => job._id === req.params._id)
    res.json(job)
}

const deleteJob = (req:Request, res:Response) => {
    const jobIndex = jobs.findIndex(job => job._id === req.params._id)
    jobs.splice(jobIndex,1)
    res.status(204).send()
}

const updateJob = (req:Request, res:Response) => {
    const reqBody = req.body
    const jobIndex:number = jobs.findIndex(job => job._id === reqBody._id)
    jobs[jobIndex].title = reqBody.title
    jobs[jobIndex].type = reqBody.type
    jobs[jobIndex].location = reqBody.location
    res.status(204).send()
}

app.get("/jobs",getJobs)
    .post("/jobs",postJobs)
    .get("/jobs/:_id",getJob)
    .delete("/jobs/:id",deleteJob)
    .put("/jobs/:id",updateJob)

app.listen(4000, () => console.log("Server is listening on port 4000."));
