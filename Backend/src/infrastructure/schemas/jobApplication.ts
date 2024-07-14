import mongoose, { Document, Schema, Types } from 'mongoose';
import {Job, JobInterface} from './jobs';

interface JobApplicationInterface extends Document {
    userId: string;
    fullName: string;
    answers: string[];
    job: Types.ObjectId | JobInterface;
    rating?: string;
}

const jobApplicationSchema = new Schema<JobApplicationInterface>({
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    answers: { type: [String], required: true },
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    rating: { type: String },
});

export const JobApplication = mongoose.model<JobApplicationInterface>('JobApplication', jobApplicationSchema);


