import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'


const Loading = () => {

    const mode = useSelector((state) => state.global.mode)

    return (
        <div className={`h-[100vh] w-[100vw] ${mode === 'dark' ? 'bg-[#1E1F26]' : 'bg-[#e5e7eb]'}`}>
            <Backdrop
                sx={{ color: mode === 'dark' ? '#1E1F26' : '#e5e7eb', width: '100%', height: '100%' }}
                open={true}
            >
                <CircularProgress sx={{ color: mode === 'dark' ? '#e5e7eb' : 'black', }} />
            </Backdrop>
        </div>
    )
}

export default Loading