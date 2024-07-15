import axios from "axios";
import {Application, JobApplication} from "@/assets/Data/interfaces.ts";
import swal from "sweetalert";

export const getJobApplication = async (jobId: string) => {
    try {
        const response = await axios.get(`https://hirly-ai-production.up.railway.app/jobApplication?jobId=${jobId}`);
        return response.data;
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log((error as Error).message);
        }
        return [];
    }
}

export const getApplicant = async (userId: string) => {
    try {
        const response = await axios.get<Application[]>(`https://hirly-ai-production.up.railway.app/jobApplication?userId=${userId}`)
        return response.data;
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log((error as Error).message);
        }
        return null;
    }
}

export const postJobApplication = async (jobApplication:JobApplication) => {
    try {
        const token = await window.Clerk.session.getToken();
        const response = await axios.post("https://hirly-ai-production.up.railway.app/jobApplication",JSON.stringify(jobApplication),{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.status === 201) {
            await swal("Success", `Job Application Posted Successfully!`, 'success')

        } else {
            await swal("Error", `Job Application Posting Failed!`, 'error')
        }
    }catch (error) {
        await swal("Error", `Job Application Posting Failed!`, 'error')
    }
}