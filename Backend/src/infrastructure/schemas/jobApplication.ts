import mongoose, { Document, Schema, Types } from 'mongoose';
import {Job} from './jobs';

interface JobApplication extends Document {
    userId: string;
    fullName: string;
    answers: string[];
    job: Types.ObjectId | Job;
    rating?: string;
}

const jobApplicationSchema = new Schema<JobApplication>({
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    answers: { type: [String], required: true },
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    rating: { type: String },
});

export const JobApplication = mongoose.model<JobApplication>('JobApplication', jobApplicationSchema);


