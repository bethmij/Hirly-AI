import logo from "@/assets/logo.png";
import {Link, useLocation} from "react-router-dom";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

const customAppearance = {
    elements: {
        userButtonAvatarBox: {
            width: '50px',
            height: '50px'
        }
    }
};

export const AdminNavBar = () => {
    const location = useLocation();

    const setMenuItem = (path: string, title: string) => {
        return <Link to={path}>
            {location.pathname === path ?
                <h2 className="text-2xl text-cyan-700 underline underline-offset-8">{title}</h2>
                : <h2 className="text-2xl hover:text-cyan-700">{title}</h2>}
        </Link>
    }

    return (
        <>
            <div className="w-full h-20 flex justify-between items-center">
                <div className="w-full h-20 absolute bg-blue opacity-25 -z-50"></div>
                <img className=" h-36 ms-10" src={logo} alt={"Img"}/>

                <div className="flex me-10 gap-x-10 items-center">

                        {setMenuItem("/", "Home")}
                        {setMenuItem("/admin/dashboard", "Dashboard")}
                        {setMenuItem("/admin/job", "Jobs")}
                        {setMenuItem("/admin/postJob", "Post-Job")}

                    <SignedOut>
                        <div className="flex gap-x-5 bg-blue px-5 rounded-2xl">
                            <SignInButton/>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton appearance={customAppearance}/>
                    </SignedIn>
                </div>
            </div>
        </>
    )
}