import {AdminNavBar} from "@/components/shared/NavBar/AdminNavBar.tsx";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {JobApplication} from "@/assets/Data/interfaces.ts";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {MdOutlineErrorOutline} from "react-icons/md";
import {CgUnavailable} from "react-icons/cg";
import {Separator} from "@/components/ui/separator.tsx";
import {FaBusinessTime} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {getJobApplication} from "@/lib/services/api/jobApplication.ts";

export const PostedJobsById = () => {
    const {jobId} = useParams<{ jobId: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [jobApplication, setJobApplication] = useState<JobApplication[] | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        if (jobId) {
            getJobApplication(jobId)
                .then(data => {
                    setJobApplication(data);
                })
                .catch(() => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [jobId]);

    return (
        <>
            <AdminNavBar/>
            <div className="px-44">
                {isLoading ? (
                    <div className="flex justify-center items-center mt-40 gap-x-5 w-full ">
                        <AiOutlineLoading3Quarters size={40} className="animate-spin"/>
                    </div>
                ) : isError ? (
                    <div className="flex justify-center items-center mt-40 gap-x-5 w-full ">
                        <MdOutlineErrorOutline size={40}/>
                        <h2>Error while fetching data</h2>
                    </div>
                ) : jobApplication && jobApplication.length > 0 ? (
                    <>
                        <h1 className="text-4xl mt-14">{jobApplication[0].job.title}</h1>
                        <div className="flex items-center gap-x-14 mt-5 mb-10">
                            <div className="flex gap-x-5">
                                <FaBusinessTime size="30"/>
                                <h2 className="text-xl">{jobApplication[0].job.type}</h2>
                            </div>
                            <div className="flex gap-x-4">
                                <FaLocationDot size="25"/>
                                <h2 className="text-xl">{jobApplication[0].job.location}</h2>
                            </div>
                        </div>
                        <Separator className="mb-10"/>
                        {jobApplication.map((application) => (
                            <Link to={`/admin/applicants/${application._id}`}>
                                <div key={application._id}
                                     className="flex justify-between cursor-pointer w-full h-20 gap-x-10 mb-10 bg-blue rounded-md">
                                    <h1 className={"self-center ms-10 text-xl"}>{application.fullName}</h1>
                                    <h5 className={"self-center me-10 text-sm"}>View</h5>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    <div className="flex justify-center items-center mt-40 gap-x-5 w-full ">
                        <CgUnavailable size={40} className="opacity-60"/>
                        <h2 className="text-2xl opacity-60">Applicants unavailable</h2>
                    </div>
                )}
            </div>
        </>
    );
};
