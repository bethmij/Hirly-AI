import {AdminNavBar} from "@/components/shared/NavBar/AdminNavBar.tsx";
import {JobCards} from "@/components/shared/JobCard/JobCards.tsx";

export const JobsPage = () => {
    return (
        <>
            <AdminNavBar/>
            <h1 className="w-full text-center mt-10 text-4xl opacity-80">Current Job Postings</h1>
            <JobCards/>
            {/*<InputItem id={} inputType={} title={} register={}*/}
        </>
    );
};
