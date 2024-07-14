import {SignIn} from "@clerk/clerk-react";

export const SigninPage = () => {
    return (
        <>
            <div className=" signin flex min-h-screen justify-center items-center ">
                <SignIn/>
            </div>

        </>
    );
};
