import {NextFunction, Request, Response} from "express";
import sendError from "../infrastructure/error";
import JobApplication from "../infrastructure/schemas/jobApplication";
import {generateRatings} from "../api/rating";

export const getApplications = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {jobId} = req.query
        const {userId} = req.query

        if(jobId){
            const application = await JobApplication.find({job: jobId}).populate("job"  ).exec()
            return res.json(application)
        }else if(userId){
            const application = await JobApplication.find({_id:userId}).populate("job").exec()
            return res.json(application)
        }
        const applications = await JobApplication.find().populate("job").exec()
        return res.json(applications)

    }catch (error){
        sendError(res,next,error)
    }
}


export const saveApplications = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const createdJobApplication = await JobApplication.create(req.body)
        await generateRatings(createdJobApplication._id)
        res.status(201).send()
    }catch (error){
        sendError(res,next,error)
    }
}

