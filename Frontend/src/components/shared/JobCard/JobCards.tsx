import {FaBusinessTime} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {Link, useLocation} from "react-router-dom";
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
        const response = await axios.get<Job[]>("https://hirly-ai-production.up.railway.app/jobs");
        return response.data || [];
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log((error as Error).message);
        }
        return [];
    }
}

const cardInfo = (title: string, type: string, location: string) => {
    return (
        <>
            <div className="w-full h-full rounded-lg bg-blue z-0 opacity-50 absolute"></div>
            <div className="w-full h-1/2 px-3 relative flex justify-center items-center">
                <div
                    className="w-full h-full rounded-t-lg bg-cyan-950 z-0 opacity-50 absolute"></div>
                <h1 className="text-3xl z-50  w-full h-full text-center text-white overflow-hidden text-ellipsis flex items-center justify-center">
                    {title}
                </h1>
            </div>
            <div className="flex flex-col justify-center items-center z-10 w-full h-1/2">
                <div className="flex gap-x-5">
                    <FaBusinessTime size="30"/>
                    <h2 className="text-xl">{type}</h2>
                </div>
                <div className="flex gap-x-5 mt-5">
                    <FaLocationDot size="25"/>
                    <h2 className="text-xl">{location}</h2>
                </div>
            </div>
        </>
    )
}

export const JobCards = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setIsLoading(true)
        getJobs()
            .then((jobs) => setJobs(jobs))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <>
            <div className="flex flex-wrap justify-center  gap-8  mt-24 ">
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
                        <div key={job._id} className="w-1/6 h-72 relative cursor-pointer">
                            {location.pathname === "/job" ?
                                <Link to={`/jobForm/${job._id}`} className="w-full h-full ">
                                    {cardInfo(job.title, job.type, job.location)}
                                </Link> :
                             location.pathname === "/admin/job" ?
                                 <Link to={`/admin/postJob/${job._id}`} className="w-full h-full ">
                                     {cardInfo(job.title, job.type, job.location)}
                                 </Link> : null
                            }
                        </div>
                    ))
                )}
            </div>


        </>
    )
}