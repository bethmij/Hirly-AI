import bgImg from "@/assets/abstract_flowing_blue_waves_design_0402.jpg";
import {NavBar} from "@/components/shared/NavBar/NavBar.tsx";
import {Outlet} from "react-router-dom";

export const RootLayout = () => {
    return (
        <>
            <img className="absolute -z-50 w-full h-screen opacity-5" src={bgImg} alt={"Img"}/>
            <NavBar/>
            <Outlet/>
        </>
    );
};
