import Navigation from "../shared/navigation.jsx";
import {Outlet} from "react-router-dom";
export default function RootLayout() {
    return(
        <>
            <Navigation/>
            <Outlet/>
        </>
    )
}