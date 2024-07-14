import {JobCards} from "@/components/shared/JobCard/JobCards.tsx";

export const JobsPage = () => {
    return (
        <>
            <h1 className="w-full text-center mt-10 text-4xl opacity-80">Current Job Postings</h1>
            <JobCards/>
        </>
    );
};
