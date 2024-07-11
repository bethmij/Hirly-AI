import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {HomePage} from "@/pages/Home/HomePage.tsx";
import JobPage from "@/pages/Job/JobPage.tsx";
import {RootLayout} from "@/layout/RootLayout/RootLayout.tsx";
import {JobFormPage} from "@/pages/JobForm/JobFormPage.tsx";
import {AdminDashboardPage} from "@/pages/AdminDashboard/AdminDashboardPage.tsx";
import {JobsPage} from "@/pages/PostedJobs/JobsPage.tsx";
import {PostJobPage} from "@/pages/PostJobs/PostJobPage.tsx";
import {ApplicantsPage} from "@/pages/Applicants /ApplicantsPage.tsx";


const router = createBrowserRouter([
    {
        element:<RootLayout/>,
        children:[
            {
                path:"/job",
                element:<JobPage/>
            },
            {
                path: "/jobForm/:jobId",
                element: <JobFormPage/>
            },
            {
                path:"/admin/dashboard",
                element:<AdminDashboardPage/>
            },
            {
                path: "/admin/job",
                element: <JobsPage/>
            },
            {
                path:"/admin/postJob",
                element:<PostJobPage/>
            },
            {
                path:"admin/postJob/:jobId",
                element:<ApplicantsPage/>
            }
        ]
    },
    {
        path:"/",
        element:<HomePage/>
    },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
