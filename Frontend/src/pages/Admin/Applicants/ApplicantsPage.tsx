import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {JobApplication} from "@/assets/Data/interfaces.ts";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {MdOutlineErrorOutline} from "react-icons/md";
import {Separator} from "@/components/ui/separator.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";

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
    const [divColor, setDivColor] = useState("")


    useEffect(() => {
        if (userId) {
            getApplicant(userId)
                .then(data => {
                    if (data) {
                        setApplicant(data)
                        setDivColor(data[0].rating === "bad" ? "bg-red" : data[0].rating === "Moderate" ?
                            "bg-yellow-500" : data[0].rating === "good" ? "bg-green-600" : "bg-cyan-200")
                    }
                })
                .catch(() => setIsError(true))
                .finally(() => setIsLoading(false))
        }
    }, [userId]);

    return (
        <>
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
                    <>
                        <div className=" flex mt-10 h-20 bg-cyan-900 rounded-md items-center">
                            <h1 className={"ms-10 text-2xl text-white"}>{applicant[0].fullName}</h1>
                            <div
                                className={`w-20 h-10 ms-10 rounded-md flex items-center justify-center align-middle ${divColor}`}>
                                <h1 className={"text-center font-bold text-white"}>{applicant[0].rating}</h1>
                            </div>
                        </div>
                        <Separator className=" my-10 "/>
                        <div className="flex flex-col">
                            <h1 className={"text-2xl text-white"}>Questions</h1>
                            {applicant[0].job.questions.map((question: string, index:number) => (
                                <>
                                    <Label className="text-xl mb-2 mt-14">{question}</Label>
                                    <Textarea className="text-lg"
                                        value={applicant[0].answers[index]} disabled={true}
                                    />
                                </>
                            ))}


                        </div>
                    </>
                ) : null
                }
            </div>

        </>
    );
};
