import useAuth from '@/hooks/useAuth'
import { Email } from '@mui/icons-material'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import StatBox from './StatBox'
import WelcomeBanner from './WelcomeBanner'
import TestDashboard from './TestDashboard'
import RecentSales from './RecentSales'
import SalesChart from './SalesChart'

const AdminDashBoard = () => {

    const { userData } = useAuth()
    const [user, setUser] = useState({})
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const theme = useTheme()

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

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <Box sx={{ mx: '20px', my: '20px' }}>
            <WelcomeBanner user={user} />
            {/* <TestDashboard /> */}
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                }}
            >
                <StatBox
                    title="Total Customers"

                    value={100}
                    increase="+14%"
                    description="Since last month"
                    icon={
                        <Email
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Premium Customers"
                    value={100}
                    increase="+14%"
                    description="Since last month"
                    icon={
                        <Email
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Non Premium Customers"
                    value={100}
                    increase="+14%"
                    description="Since last month"
                    icon={
                        <Email
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Administrators"
                    value={100}
                    increase={null}
                    description=""
                    icon={
                        <Email
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <SalesChart />
                <RecentSales />
            </Box>
        </Box>
    )
}

export default AdminDashBoard