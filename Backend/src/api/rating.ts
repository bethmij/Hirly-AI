import OpenAI from "openai"
import JobApplication from "../infrastructure/schemas/jobApplication";


const client = new OpenAI({apiKey: process.env.OPEN_API_KEY})

export const generateRatings = async (jobApplicationId:any) => {
    const jobApplication = await JobApplication.findById(jobApplicationId).populate("job").exec()
    const content = `Role:${jobApplication?.job.title}, User Description:${jobApplication?.answers.join(". ")}`
    const completion = await client.chat.completions.create(
        {
            messages:[{role:"user",content}],
            model:"ft:gpt-3.5-turbo-0125:stemlink:hirly-ai:9dYhjaxf"
        }
    )
    const response = JSON.parse(<string>completion.choices[0].message.content)

    if(!response.rate){
        return
    }

    await JobApplication.findOneAndUpdate({_id:jobApplicationId},{rating: response.rate})

}