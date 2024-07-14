import mongoose from "mongoose";

export interface Job {
    _id: string;
    title: string;
    type: string;
    description: string;
    location: string;
    questions: string[];
}

const jobSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        questions: {
            type: [String],
            default: [
                "Share your academic background and highlight key programming concepts you've mastered. How has your education shaped your current tech skill set ?",
                "Describe your professional development, emphasizing any certifications obtained. How have these certifications enriched your technical abilities, and can you provide an example of their practical application ?",
                "Discuss notable projects in your programming experience. What challenges did you face, and how did you apply your skills to overcome them? Highlight the technologies used and the impact of these projects on your overall growth as a prefessional ?"
            ]
        }

    }
)

export const Job = mongoose.model<Job>("Job", jobSchema)
