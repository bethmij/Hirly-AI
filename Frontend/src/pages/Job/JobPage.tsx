import JobCard from "@/components/shared/JobCard/JobCard.tsx";
import logo from "@/assets/logo.png"
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";


export default function JobPage() {
    return (
        <>
            <div className="w-full h-20 flex justify-between items-center">
                <div className="w-full h-20 absolute bg-blue opacity-25 -z-50"></div>
                <img className=" h-36 ms-10" src={logo} alt={"Img"}/>
                <h1 className="text-4xl opacity-80 text-center">Available Jobs</h1>
                <div className="flex me-10 gap-x-10 items-center">
                    <Link to="/">
                        <h2 className="text-2xl hover:text-cyan-700">Home</h2>
                    </Link>
                    <Link to="/job">
                        <h2 className="text-2xl  hover:text-cyan-700">Jobs</h2>
                    </Link>
                    <Avatar className="w-12 h-12">
                        <AvatarImage src="https://github.com/shadcn.pn"/>
                        <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="flex flex-col mt-24 gap-y-14">
                <div className="flex justify-around gap-x-8 ms-16 me-16">
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                </div>
                <div className="flex justify-around gap-x-8 ms-16 me-16">
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                    <JobCard/>
                </div>
            </div>

        </>
    )
}