import {FaBusinessTime} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {Link} from "react-router-dom";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {MdOutlineErrorOutline} from "react-icons/md";
import {CgUnavailable} from "react-icons/cg";
import {useEffect, useState} from "react";
import axios from "axios";


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

export const JobCards = () =>{
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
                        <div className="w-1/6 h-72  relative cursor-pointer">
                            <Link to={`/jobForm/${job._id}`} className="w-full h-full ">
                                <div className="w-full h-full rounded-lg bg-blue z-0 opacity-50 absolute"></div>
                                <div className="w-full h-1/2 relative flex justify-center items-center">
                                    <div
                                        className="w-full h-full rounded-t-lg bg-cyan-950 z-0 opacity-50 absolute"></div>
                                    <h1 className="text-3xl text-center z-10 text-white">
                                        {job.title}
                                    </h1>
                                </div>
                                <div className="flex flex-col justify-center items-center z-10 w-full h-1/2">
                                    <div className="flex gap-x-5">
                                        <FaBusinessTime size="30"/>
                                        <h2 className="text-xl">{job.type}</h2>
                                    </div>
                                    <div className="flex gap-x-5 mt-5">
                                        <FaLocationDot size="25"/>
                                        <h2 className="text-xl">{job.location}</h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>


        </>
    )
}