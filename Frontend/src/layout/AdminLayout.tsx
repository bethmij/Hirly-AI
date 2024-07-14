import {AdminNavBar} from "@/components/shared/NavBar/AdminNavBar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useUser} from "@clerk/clerk-react";
import  {useEffect} from "react";

export const AdminLayout = () => {
    const { isLoaded, isSignedIn, user } = useUser()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        if (!isSignedIn) {
            return navigate("/sign-in");
        }

        if (user?.publicMetadata?.role !== "admin") {
            return navigate("/");
        }
    }, [isLoaded, isSignedIn, navigate, user]);

    return (
        <>
            <AdminNavBar/>
            <Outlet/>
        </>
    );
};
