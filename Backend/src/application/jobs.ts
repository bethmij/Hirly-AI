import  {Request, Response} from "express";
import {jobs} from "../infrastructure/jobs";
import Job from "../infrastructure/schemas/jobs";


export const getJobs = async (req:Request,res:Response) => {
    const jobs = await Job.find()
    res.json(jobs)
}

export const postJobs = async (req:Request, res:Response) => {
    const reqBody = req.body;

    await Job.create(reqBody)
    res.status(201).send()
}

export const getJob = (req:Request, res:Response) => {
    const job = jobs.find(job => job._id === req.params._id)

    if(!job){
        return res.status(400).send()
    }
    res.json(job)
}

export const deleteJob = (req:Request, res:Response) => {
    const jobIndex = jobs.findIndex(job => job._id === req.params._id)

    if(jobIndex==-1){
        return res.status(400).send()
    }
    jobs.splice(jobIndex,1)
    res.status(204).send()
}

export const updateJob = (req:Request, res:Response) => {
    const reqBody = req.body
    const jobIndex:number = jobs.findIndex(job => job._id === reqBody._id)

    if(jobIndex==-1){
        return res.status(400).send()
    }

    jobs[jobIndex].title = reqBody.title
    jobs[jobIndex].type = reqBody.type
    jobs[jobIndex].location = reqBody.location
    res.status(204).send()
}