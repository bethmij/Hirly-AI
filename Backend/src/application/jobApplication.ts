import {NextFunction, Request, Response} from "express";
import sendError from "../infrastructure/error";
import JobApplication from "../infrastructure/schemas/jobApplication";

export const getApplications = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {id} = req.query

        if(id){
            const application = await JobApplication.find({job: id})
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
        await JobApplication.create(req.body)
        res.status(201).send()
    }catch (error){
        sendError(res,next,error)
    }
}

