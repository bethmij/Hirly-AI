import {NextFunction, Request, Response} from "express";
import {JobApplication} from "../infrastructure/schemas/jobApplication";

import NotFoundError from "../domain/errors/not-found-error";
import z from "zod";
import ValidationError from "../domain/errors/validation-error";
import {generateRating} from "../api/rating";

export const getApplications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {jobId} = req.query
        const {userId} = req.query

        if (jobId) {
            const application = await JobApplication.find({job: jobId}).populate("job").exec()
            if (!application) {
                throw new NotFoundError("Job Application not found")
            }
            return res.json(application)

        } else if (userId) {
            const application = await JobApplication.find({_id: userId}).populate("job").exec()
            if (!application) {
                throw new NotFoundError("Job Application not found")
            }
            return res.json(application)
        }
        const applications = await JobApplication.find().populate("job").exec()
        return res.json(applications)

    } catch (error) {
        next(error)
    }
}


export const saveApplications = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    try {
        const jobApplicationSchema = z.object({
            userId: z.string(),
            fullName: z.string(),
            answers: z.string().array(),
            job: z.string(),
            rating: z.string().optional(),
        });

        const jobApplication = jobApplicationSchema.safeParse(req.body);

        if (!jobApplication.success) {
            throw new Error(jobApplication.error.message);
        }

        const createdJobApplication = await JobApplication.create(jobApplication.data);
        await generateRating(createdJobApplication._id);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
}

