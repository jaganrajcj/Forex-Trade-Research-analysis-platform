import { CircularProgress } from '@mui/material'
import React from 'react'

const CircularLoad = () => {
    return (
        <div className='flex w-full h-[80vh] justify-center items-center'>
            <CircularProgress />
        </div>
    )
}

export default CircularLoad