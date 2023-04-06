import React, { useMemo, useState } from 'react'
import { Box, createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar'
import Sidebar from "./Sidebar"
import Dashboard from "../Dashboard"
import Users from "../Users"
import Logout from "@/components/Logout"
import Fundamentals from '../Fundamentals';
import { themeSettings } from '@/theme'
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { useEffect } from 'react';

const routes = [
    {
        path: "/",
        component: <Dashboard />,
    },
    {
        path: "dashboard",
        component: <Dashboard />,
    },
    {
        path: "journal",
        component: <h1>Journal...</h1>,
    },
    {
        path: "users",
        component: <Users />
    },
    {
        path: "fundamentals",
        component: <Fundamentals />
    },
    // {
    //     path: "logout",
    //     component: <Logout />
    // }
]

const AdminLayout = () => {

    const mode = useSelector((state) => state.global.mode)

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const { userData } = useAuth()
    const [user, setUser] = useState({})

    const fetchUser = async () => {
        try {

            const user = await axios.get(import.meta.env.VITE_API_URL + '/users',
                { headers: { "x-auth-token": userData.token } })

            // console.log(user.data)

            if (user.data.status) setUser(user.data)
        }
        catch (err) {
            console.log('Error Fetching user from database: ' + err.message)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
                <Sidebar
                    isNonMobile={isNonMobile}
                    drawerWidth="250px"
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    user={user}

                />
                <Box flexGrow={1}>
                    <Navbar
                        // user={data || {}}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                        user={user}
                    />
                    <Routes>
                        {
                            routes.map(({ path, component }) => {
                                return <Route exact path={path} element={component} key={path} />
                            })
                        }
                    </Routes>

                    {/* <Outlet /> */}
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default AdminLayout