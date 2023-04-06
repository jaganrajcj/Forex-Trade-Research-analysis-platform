import React, { useState, useEffect, Suspense } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './Layout'

// import Dashboard from './Dash'
const Dashboard = React.lazy(() => import("./Dash"))
// import Journal from './Journal'
const Journal = React.lazy(() => import("./Journal"))
// import Profile from './Profile'
const Profile = React.lazy(() => import("./Profile"))
// import Summary from './Summary'
const Summary = React.lazy(() => import("./Summary"))
const Fundamental = React.lazy(() => import('./Fundamental'))

import { useMediaQuery } from '@mui/material'
// import { Box } from '@mui/system'
import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import useAuth from '@/hooks/useAuth'
import axios from 'axios'
import useGetTheme from '@/hooks/useGetTheme'
import Posts from './Posts'
import CircularLoad from '@/components/CircularLoad'
import Premium from './Premium'

const routes = [
    {
        path: "/",
        component: <Dashboard />,
    },
    {
        path: "journal",
        component: <Journal />,
    },
    {
        path: "profile",
        component: <Profile />,
    },
    {
        path: "summary",
        component: <Summary />,
    },
    {
        path: "fundamental",
        component: <Fundamental />,
    },
    {
        path: "fundamental/:market",
        component: <Fundamental />,
    },
    {
        path: "posts",
        component: <Posts />,
    },
    {
        path: "premium",
        component: <Premium />,
    },
    {
        path: "*",
        component: <h2>Route cannot be resolved...</h2>
    }
]

const UserDashboard = () => {

    const mode = useSelector((state) => state.global.mode)

    const { userData } = useAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    const [isSidebarOpen, setIsSideBarOpen] = useState(true)
    const theme = useGetTheme()

    useEffect(() => {
        if (userData.token == undefined) navigate('/auth')

        const validateUser = async () => {
            let tokenResponse
            try {
                tokenResponse = await axios.get(import.meta.env.VITE_API_URL + '/users',
                    { headers: { "x-auth-token": userData.token } })

                if (tokenResponse.data.status) {
                    setIsLoading(false)
                    setUser(tokenResponse.data)
                    // console.log(tokenResponse.data)
                }

                else {
                    localStorage.setItem("auth-token", "")
                    navigate('/auth')
                }
            }
            catch (err) {
                console.log(err.code, err.message)
                localStorage.setItem("auth-token", "")
                navigate('/auth')
            }
        }

        if (userData?.token) validateUser()
        else {
            localStorage.setItem("auth-token", "")
            navigate('/auth')
        }

    }, [userData])


    const isNonMobile = useMediaQuery("(min-width: 600px)");

    useEffect(() => {
        if (!isNonMobile) setIsSideBarOpen(false)
        else setIsSideBarOpen(true)
    }, [isNonMobile])

    return (
        <>
            {!isLoading &&
                <div className={`${mode === "dark" ? 'bg-[#11101d]' : 'bg-[#f3f6fd]'} h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-[#359AEF] scrollbar-track-[${theme.palette.custom[300]}] scrollbar-thumb-rounded`}>
                    <Layout user={user} isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen} />
                    <div className={`transition-all ease-in-out duration-300 mr-5 ${isSidebarOpen ? 'ml-[20rem]' : 'ml-7'} `}>
                        <Suspense fallback={<CircularLoad />}>
                            <Routes>
                                {
                                    routes.map(({ path, component }) => {
                                        return <Route path={path + '/*'} element={component} key={path} />
                                    })
                                }
                            </Routes>
                        </Suspense>
                    </div>
                </div>
                // : <div className={`h-[100vh] w-[100vw] ${mode === 'dark' ? 'bg-[#1E1F26]' : 'bg-[#e5e7eb]'}`}>
                //     <Backdrop
                //         sx={{ color: mode === 'dark' ? '#1E1F26' : '#e5e7eb', width: '100%', height: '100%' }}
                //         open={true}
                //     >
                //         <CircularProgress sx={{ color: mode === 'dark' ? '#e5e7eb' : 'black', }} />
                //     </Backdrop>
                // </div>
            }
        </>
    )
}

export default UserDashboard