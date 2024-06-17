import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {HomePage} from "@/pages/Home/HomePage.tsx";
import JobPage from "@/pages/Job/JobPage.tsx";
import {RootLayout} from "@/layout/RootLayout/RootLayout.tsx";
import {JobFormPage} from "@/pages/JobForm/JobFormPage.tsx";


const router = createBrowserRouter([
    {
        element:<RootLayout/>,
        children:[
            {
                path:"/job",
                element:<JobPage/>
            },
            {
                path:"/jobForm",
                element:<JobFormPage/>
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
