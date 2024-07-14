import {useEffect, useRef, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';
import {AdminNavBar} from "@/components/shared/NavBar/AdminNavBar.tsx";
import {AiOutlineForm, AiOutlineLoading3Quarters} from "react-icons/ai";
import {FaRegUser} from "react-icons/fa";
import axios from "axios";
import {Job, JobApplication} from "@/assets/Data/interfaces.ts";
import {MdOutlineErrorOutline} from "react-icons/md";

const getAllApplications = async () => {
    try {
        const response = await axios.get<JobApplication[]>('http://localhost:4000/jobApplication');
        return response.data;
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log((error as Error).message);
        }
        return []
    }
}

const getAllJobForm = async () => {
    try {
        const response = await axios.get<Job[]>('http://localhost:4000/jobs');
        return response.data;
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            console.log((error as Error).message);
        }
        return []
    }
}

export const AdminDashboardPage = () => {
    const ref = useRef();
    const [applicants, setApplicants] = useState<JobApplication[]>([])
    const [jobForm, setJobForm] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [chartData, setChartData] = useState(new Map())

    useEffect(() => {
        getAllApplications()
            .then(data => {
                setApplicants(data)
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))

        getAllJobForm()
            .then(data => {
                setJobForm(data)
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))

    }, [])

    useEffect(() => {
        const chartData = new Map();
        jobForm.map(job => {
            const good = applicants.filter(app => app.job.title === job.title && app.rating === 'good').length;
            const moderate = applicants.filter(app => app.job.title === job.title && app.rating === 'moderate').length;
            const bad = applicants.filter(app => app.job.title === job.title && app.rating === 'bad').length;
            chartData.set(job.title, [good, moderate, bad]);
        })
        setChartData(chartData)
    }, [applicants,jobForm]);


    const pieChartData = (data: []) => ({

            labels: ['Good', 'Moderate', 'Bad'],
            datasets: [
                {
                    label: 'Job Applications',
                    data: data,
                    backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
                    hoverBackgroundColor: ['#45a049', '#ffc107', '#f44336'],
                    borderWidth: 1
                },
            ],
        }
    )


    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                bodyFont: {
                    size: 20,
                },
                titleFont: {
                    size: 15,
                },
            },
        },
    };

    return (
        <>
            <AdminNavBar/>
            {isLoading ? (
                <div className="flex justify-center items-center  w-full ">
                    <AiOutlineLoading3Quarters size={40} className="animate-spin"/>
                </div>
            ) : isError ? (
                <div className="flex justify-center items-center  w-full ">
                    <MdOutlineErrorOutline size={40}/>
                    <h2>Error while fetching data</h2>
                </div>
            ) : (
                <>
                    <div className={"flex w-full justify-around"}>
                        <div className="flex justify-around px-5  w-1/4 rounded-3xl h-36  items-center mt-10">
                            <div className={"flex flex-col"}>
                                <h1 className={"z-50 text-white text-2xl w-full mb-3 "}>Total Jobs Posted</h1>
                                <h1 className={"z-50 text-white text-3xl w-full "}>{jobForm.length}</h1>
                            </div>
                            <AiOutlineForm size={70}/>
                            <div className=" w-1/4 rounded-3xl h-36 absolute bg-blue opacity-25"></div>
                        </div>

                        <div className="flex justify-around px-5  w-1/4 rounded-3xl h-36  items-center mt-10">
                            <div className={"flex flex-col"}>
                                <h1 className={"z-50 text-white text-2xl w-full mb-3 "}>Total Applicants</h1>
                                <h1 className={"z-50 text-white text-3xl w-full "}>{applicants.length}</h1>
                            </div>
                            <FaRegUser size={60}/>
                            <div className=" w-1/4 rounded-3xl h-36 absolute bg-blue opacity-25"></div>
                        </div>
                    </div>
                    <div className={"w-full mt-10 gap-x-5 flex justify-center"}>
                        <div className={"self-center w-5 h-3 bg-green-600"}></div>
                        <h3>Good</h3>
                        <div className={"self-center w-5 h-3 bg-yellow-500"}></div>
                        <h3>Moderate</h3>
                        <div className={"self-center w-5 h-3 bg-red"}></div>
                        <h3>Bad</h3>
                    </div>

                    <div className="flex flex-wrap w-full justify-center h-screen mt-16">
                        {Array.from(chartData.entries()).map(([key, value]) => (
                            <div key={key} className="flex items-center flex-col w-1/3 h-1/3">
                                <h1 className="text-2xl w-full text-center mb-8 text-white">{key}</h1>
                                <Doughnut ref={ref} data={pieChartData(value)} options={options}/>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </>
    )
};