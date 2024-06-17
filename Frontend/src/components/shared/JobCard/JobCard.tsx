import {FaBusinessTime} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";

interface JobCardProps{
    title:string,
    time:string,
    location:string
}

export const JobCard = (props:JobCardProps) =>{
    return (
        <>
            <div className="w-1/6 h-72 rounded-2xl relative">
                <div className="w-full h-full bg-blue z-0 opacity-50 absolute"></div>
                <div className="w-full h-1/2 relative flex justify-center items-center">
                    <div className="w-full h-full bg-cyan-950 z-0 opacity-50 absolute"></div>
                    <h1 className="text-3xl text-center z-10 text-white">
                        {props.title}
                    </h1>
                </div>
                <div className="flex flex-col justify-center items-center z-10 w-full h-1/2">
                    <div className="flex gap-x-5">
                        <FaBusinessTime size="30"/>
                        <h2 className="text-xl">{props.time}</h2>
                    </div>
                    <div className="flex gap-x-5 mt-5">
                        <FaLocationDot size="25"/>
                        <h2 className="text-xl">{props.location}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}