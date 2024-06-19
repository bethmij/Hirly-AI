import {JobCard} from "@/components/shared/JobCard/JobCard.tsx";
import {NavBar} from "@/components/shared/NavBar/NavBar.tsx";
import {PiUserList} from "react-icons/pi"
import {useEffect, useState} from "react";
import axios from "axios";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {MdOutlineErrorOutline} from "react-icons/md";
import {CgUnavailable} from "react-icons/cg";

interface Job {
    _id: string
    title: string
    type: string
    description: string
    location: string
    questions: []
}

const getJobs = async (): Promise<Job[]> => {
    try {
        const response = await axios.get<Job[]>("http://localhost:4000/jobs");
        return response.data || [];
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log((error as Error).message);
        }
        return [];
    }
}
export default function JobPage() {

    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getJobs()
            .then((jobs) => setJobs(jobs))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }, [])


    return (
        <>
            <NavBar title={"Available Jobs"} icon={<PiUserList className="opacity-70" size={45}/>}/>

            <div className="flex flex-wrap gap-8 ms-16 mt-24 me-16">
                {(isLoading) ? (
                    <div className="flex justify-center items-center  w-full ">
                        <AiOutlineLoading3Quarters size={40} className="animate-spin"/>
                    </div>
                ) : (isError) ? (
                    <div className="flex justify-center items-center  w-full ">
                        <MdOutlineErrorOutline size={40}/>
                        <h2>Error while fetching data</h2>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="flex justify-center items-center  w-full ">
                        <CgUnavailable size={40} className=" opacity-60"/>
                        <h2 className="text-2xl opacity-60">Jobs unavailable</h2>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <JobCard key={job._id} id={job._id} title={job.title} type={job.type} location={job.location}/>
                    ))
                )}

            </div>


        </>
    )
}