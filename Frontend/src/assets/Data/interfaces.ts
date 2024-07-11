export interface Job {
    _id: string
    title: string
    type: string
    description: string
    location: string
    questions: string[]
}

export interface JobApplication {
    userId: string
    fullName: string
    answers: string[]
    job:Job
}