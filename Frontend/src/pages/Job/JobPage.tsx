import {JobCard} from "@/components/shared/JobCard/JobCard.tsx";



export default function JobPage() {
    return (
        <>

            <div className="flex flex-col mt-24 gap-y-14">
                <div className="flex justify-around gap-x-8 ms-16 me-16">
                    <JobCard title="Cloud Solution Engineer" time="Full Time" location="Remote"/>
                    <JobCard title="Cloud Solution Engineer" time="Full Time" location="Remote"/>
                    <JobCard title="Cloud Solution Engineer" time="Full Time" location="Remote"/>
                    <JobCard title="Cloud Solution Engineer" time="Full Time" location="Remote"/>
                </div>
                <div className="flex justify-around gap-x-8 ms-16 me-16">
                    <JobCard title="Cloud Solution Engineer" time="Full Time" location="Remote"/>
                    <JobCard title="Cloud Solution Engineer" time="Full Time" location="Remote"/>
                    <JobCard title="Cloud Solution Engineer" time="Full Time" location="Remote"/>
                    <JobCard title="Cloud Solution Engineer" time="Full Time" location="Remote"/>
                </div>
            </div>

        </>
    )
}