import axios from "axios";
import {Application, JobApplication} from "@/assets/Data/interfaces.ts";

export const getJobApplication = async (jobId: string) => {
    try {
        const response = await axios.get(`http://localhost:4000/jobApplication?jobId=${jobId}`);
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
        const response = await axios.get<Application[]>(`http://localhost:4000/jobApplication?userId=${userId}`)
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
        const response = await axios.post("http://localhost:4000/jobApplication",JSON.stringify(jobApplication),{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.status === 201){
            alert("application saved")
        }else{
            alert("application saving failed")
        }
    }catch (error){
        console.log(error)
    }
}