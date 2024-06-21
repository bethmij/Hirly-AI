import {JobCards} from "@/components/shared/JobCard/JobCards.tsx";
import {NavBar} from "@/components/shared/NavBar/NavBar.tsx";
import {PiUserList} from "react-icons/pi"

export default function JobPage() {
    return (
        <>
            <NavBar title={"Available Jobs"} icon={<PiUserList className="opacity-70" size={45}/>}/>
            <JobCards/>
        </>
    )
}