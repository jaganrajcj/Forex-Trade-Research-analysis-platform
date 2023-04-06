import useAuth from '@/hooks/useAuth'
import { Backdrop, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const { setUserData } = useAuth()
    const navigate = useNavigate

    console.log('Logging out...')
    setUserData({
        id: undefined,
        token: undefined,
        type: undefined,
    })
    localStorage.setItem("auth-token", "");
    navigate("/")


    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Backdrop
                sx={{ color: '#fff', width: '100%', height: '100%' }}
                open={true}
            >
                <CircularProgress sx={{ color: '#dcdee5' }} />
            </Backdrop>

        </Box>
    )
}

export default Logout