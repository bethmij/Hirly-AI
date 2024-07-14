import {SignUp} from "@clerk/clerk-react";

export const SignupPage = () => {
    return (
        <>
            <div className="flex min-h-screen justify-center items-center">
                <SignUp/>
            </div>
        </>
    );
};
