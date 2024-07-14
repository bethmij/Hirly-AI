import {NextFunction, Request, Response} from "express";
import {Job} from "../infrastructure/schemas/jobs";
import ValidationError from "../domain/errors/validation-error";
import z from "zod";
import NotFoundError from "../domain/errors/not-found-error";

export const getAllJobs = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const jobs = await Job.find()
        res.json(jobs)
    }catch (error) {
        next(error)
    }
}

export const postJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobSchema = z.object({
            title: z.string(),
            description: z.string(),
            type: z.string(),
            location: z.string(),
            questions: z.string().array().optional(),
        });

        const job = jobSchema.safeParse(req.body);

        if (!job.success) {
            throw new ValidationError(job.error.message);
        }

        await Job.create(job.data);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

export const getJobById = async (req:Request, res:Response,next:NextFunction) => {

    try{

        const job = await Job.findById(req.params._id);
        if (!job) {
            throw new NotFoundError("Job not found")
        }
        res.json(job)
    }catch (error){
        next(error)
    }
}

export const deleteJob = async (req:Request, res:Response,next:NextFunction) => {
    try{

        const job = await Job.findByIdAndDelete(req.params._id);
        if (!job) {
            throw new NotFoundError("Job not found")
        }
        res.status(204).send()
    }catch (error){
        next(error)
    }
}

export const updateJob = async (req:Request, res:Response, next:NextFunction) => {

    try {
        const jobToUpdate = Job.findById(req.params._id);
        if (!jobToUpdate) {
            throw new NotFoundError("Job not found")
        }
        const job = z.object({ title: z.string(), description: z.string(), type: z.string(), location: z.string(), questions: z.string().array().optional() }).safeParse(req.body)
        if (!job.success) {
            throw new ValidationError(job.error.message)
        }
        await Job.findByIdAndUpdate(req.params._id,{$set:job})
        return res.status(204).send();
    }catch (error){
        next(error)
    }
}
