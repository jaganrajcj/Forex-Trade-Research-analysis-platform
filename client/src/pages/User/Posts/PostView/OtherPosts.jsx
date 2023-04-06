import { Typography } from '@mui/material'
import React from 'react'

const OtherPosts = () => {
    return (
        <div>
            <Typography variant='h6' sx={{ height: '2.5rem', display: 'flex', alignItems: 'center', pl: '1rem', color: 'white', borderBottomLeftRadius: '.2rem', borderBottomRightRadius: '.2rem', borderTopLeftRadius: '.2rem', borderTopRightRadius: '.2rem' }} className="bg-gradient-to-tr from-blue-600 to-blue-400">
                Other Posts
            </Typography>
        </div>
    )
}

export default OtherPosts