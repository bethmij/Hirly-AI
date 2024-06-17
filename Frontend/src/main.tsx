import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import HomePage from "@/pages/Home/HomePage.tsx";
import JobPage from "@/pages/Job/JobPage.tsx";


const router = createBrowserRouter([
    {
        path:"/",
        element:<HomePage/>
    },
    {
        path:"/job",
        element:<JobPage/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
