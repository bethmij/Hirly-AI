import {JobCard} from "@/components/shared/JobCard/JobCard.tsx";



export default function JobPage() {
    return (
        <>

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