import {NextFunction, Request, Response} from "express";
import Job from "../infrastructure/schemas/jobs";
import sendError from "../infrastructure/error";

export const getAllJobs = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const jobs = await Job.find()
        res.json(jobs)
    }catch (error) {
        sendError(res,next,error)
    }
}

export const postJobs = async (req:Request, res:Response,next:NextFunction) => {
    try {
        const reqBody = req.body;
        await Job.create(reqBody)
        res.status(201).send()

    }catch (error){
        sendError(res,next,error)
    }

}

export const getJobById = async (req:Request, res:Response,next:NextFunction) => {

    try{
        const job = await Job.findById(req.params._id)
        res.json(job)
    }catch (error){
        sendError(res,next,error)
    }
}

export const deleteJob = async (req:Request, res:Response,next:NextFunction) => {
    try{
        await Job.findByIdAndDelete(req.params._id)
        res.status(204).send()
    }catch (error){
        sendError(res,next,error)
    }
}

export const updateJob = async (req:Request, res:Response, next:NextFunction) => {

    try {
        const reqBody = req.body
        await Job.findByIdAndUpdate(req.params._id,{$set:reqBody})
        res.status(204).send()
    }catch (error){
        sendError(res,next,error)
    }
}
