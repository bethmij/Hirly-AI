import bgImg from "@/assets/ladyLaptop.png"
import logo from "@/assets/logo.png"
import {TiSocialLinkedinCircular} from "react-icons/ti";
import {RiFacebookCircleLine} from "react-icons/ri";
import {Link} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";


export default function HomePage() {
    return (
        <>
            <div
                className="w-full h-screen bg-gradient-to-bl from-sky-900 via-slate-900
                to-sky-900 absolute -z-50 opacity-35"></div>
            <img className=" w-1/3 absolute right-28 bottom-0  z-20" src={bgImg} alt={"Img"}/>
            <div
                className="w-[45vw] h-[45vw] right-12 opacity-70 -bottom-24  absolute z-10 rounded-full bg-blue "></div>
            <div className="w-[40vw] flex justify-between align-middle items-center">
                <img className=" w-2/6 ms-[5vw]   " src={logo} alt={"Img"}/>
                <div className="flex -right-16 gap-x-5">
                    <Link to="/">
                        <h2 className="text-3xl hover:text-cyan-500">Home</h2>
                    </Link>
                    <Link to="/job">
                    <h2 className="text-3xl  hover:text-cyan-500">Jobs</h2>
                    </Link>
                    <Avatar className="w-12 h-12">
                        <AvatarImage src="https://github.com/shadcn.pn"/>
                        <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                </div>

            </div>

            <h1 className="text-7xl mt-20 ms-40 bold leading-tight">Find your
                <br/> <span className="text-cyan-500">dream job</span> here <br/> easily
                and quickly</h1>
            <div className="flex justify-center align-middle  w-[20vw] ms-10 mt-10">
                <TiSocialLinkedinCircular size="85" className=" opacity-40 cursor-pointer hover:opacity-60"/>
                <RiFacebookCircleLine size="75" className=" opacity-40 mt-1 cursor-pointer hover:opacity-60"/>
            </div>


        </>
    )
}


