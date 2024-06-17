import bgImg from "@/assets/abstract_flowing_blue_waves_design_0402.jpg";
import {NavBar} from "@/components/shared/NavBar/NavBar.tsx";
import {Outlet} from "react-router-dom";

export const RootLayout = () => {
    return (
        <>
            <div className="relative h-screen">
                <img
                    className="fixed top-0 left-0 w-full h-screen -z-10 opacity-5"
                    src={bgImg}
                    alt="Background"
                />
                <div className="relative z-10">
                    <NavBar/>
                    <Outlet/>
                </div>
            </div>
        </>
    );
};
