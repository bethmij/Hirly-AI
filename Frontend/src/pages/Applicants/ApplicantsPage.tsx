import {AdminNavBar} from "@/components/shared/NavBar/AdminNavBar.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {JobApplication} from "@/assets/Data/interfaces.ts";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {MdOutlineErrorOutline} from "react-icons/md";

const getApplicant = async (userId: string) => {
    try {
        const response = await axios.get<JobApplication[]>(`http://localhost:4000/jobApplication?userId=${userId}`)
        return response.data;
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log((error as Error).message);
        }
        return null;
    }


}

export const ApplicantsPage = () => {

    const {userId} = useParams<{ userId: string }>()
    const [applicant, setApplicant] = useState<JobApplication[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (userId) {
            getApplicant(userId)
                .then(data => {
                    if(data){
                        setApplicant(data)
                        console.log(data)
                    }
                })
                .catch(() => setIsError(true))
                .finally(() => setIsLoading(false))
        }
    }, [userId]);

    return (
        <>
            <AdminNavBar/>
            <div className={"px-44"}>
                {isLoading ? (
                    <div className="flex justify-center items-center mt-40 gap-x-5 w-full ">
                        <AiOutlineLoading3Quarters size={40} className="animate-spin"/>
                    </div>
                ) : isError ? (
                    <div className="flex justify-center items-center mt-40 gap-x-5 w-full ">
                        <MdOutlineErrorOutline size={40}/>
                        <h2>Error while fetching data</h2>
                    </div>
                ) : applicant ? (
                    <div className=" flex mt-10 h-20 bg-cyan-900 rounded-md items-center">
                        <h1 className={"ms-10 text-2xl text-white"}>{applicant[0].fullName}</h1>
                        <div className={"w-20 h-10 ms-10 rounded-md  align-middle bg-red"}>

                        </div>
                    </div>
                ) : null
                }
            </div>

        </>
    );
};
