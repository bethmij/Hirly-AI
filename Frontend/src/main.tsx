import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {HomePage} from "@/pages/Home/HomePage.tsx";
import JobPage from "@/pages/Job/JobPage.tsx";
import {RootLayout} from "@/layout/RootLayout/RootLayout.tsx";
import {JobFormPage} from "@/pages/JobForm/JobFormPage.tsx";
import {AdminDashboardPage} from "@/pages/Admin/AdminDashboard/AdminDashboardPage.tsx";
import {JobsPage} from "@/pages/Admin/PostedJobs/JobsPage.tsx";
import {PostJobPage} from "@/pages/Admin/PostJobs/PostJobPage.tsx";
import {PostedJobsById} from "@/pages/Admin/PostedJobsById/PostedJobsById.tsx";
import {ApplicantsPage} from "@/pages/Admin/Applicants/ApplicantsPage.tsx";
import {ClerkProvider} from "@clerk/clerk-react";
import {SigninPage} from "@/pages/Login/Signin/SigninPage.tsx";
import {SignupPage} from "@/pages/Login/Signup/SignupPage.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {
                path: "/job",
                element: <JobPage/>
            },
            {
                path: "/jobForm/:jobId",
                element: <JobFormPage/>
            },
            {
                path: "/admin/dashboard",
                element: <AdminDashboardPage/>
            },
            {
                path: "/admin/job",
                element: <JobsPage/>
            },
            {
                path: "/admin/postJob",
                element: <PostJobPage/>
            },
            {
                path: "admin/postJob/:jobId",
                element: <PostedJobsById/>
            },
            {
                path: "admin/applicants/:userId",
                element: <ApplicantsPage/>
            }
        ]
    },
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path:"/signin",
        element: <SigninPage/>
    },
    {
        path:"/signup",
        element: <SignupPage/>
    }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <RouterProvider router={router}/>
        </ClerkProvider>
    </React.StrictMode>,
)
