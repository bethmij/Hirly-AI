import axios from "axios";
import {FieldValues} from "react-hook-form";

export const getJobApplication = async (jobId: string) => {
    const token = await window.Clerk.session.getToken();
    try {
        const job = await axios.get(`http://localhost:4000/jobs/${jobId}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return job.data
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log((error as Error).message);
        }
    }
}

export const postJob = async (data: FieldValues) => {
    try {
        const response = await axios.post("http://localhost:4000/jobs", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 201) {
            alert("job posted")

        } else {
            alert("error")
        }
    }catch (error) {
        console.log(error)
    }
}