import CircularLoad from '@/components/CircularLoad'
import Header from '@/components/Header'
import useAuth from '@/hooks/useAuth'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Pricing = React.lazy(() => import('./Pricing'))
const Success = React.lazy(() => import('./Success'))
const Failure = React.lazy(() => import('./Failure'))
const Details = React.lazy(() => import('./Details'))


const Premium = () => {

    const { userData } = useAuth()
    const [isUserPremium, setIsUserPremium] = useState(userData.plan == "Premium" ? true : false)

    return (
        <Box
            sx={{ mt: '20px', mb: '20px' }}
        >
            {/* <Header title="SUBSCRIPTION" /> */}
            <Suspense fallback={<CircularLoad />}>
                <Routes>
                    <Route path="/" element={isUserPremium ? <Details setIsUserPremium={setIsUserPremium} /> : <Pricing />} />
                    <Route path="upgrade-success" element={<Success setIsUserPremium={setIsUserPremium} />} />
                    <Route path="upgrade-failed" element={<Failure />} />
                    <Route path="*" element={<>Route not found</>} />
                </Routes>
            </Suspense>
        </Box>
    )
}

export default Premium