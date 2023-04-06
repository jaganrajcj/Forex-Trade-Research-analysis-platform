import { Typography } from '@mui/material'
import React from 'react'

const UserDetails = () => {
    return (
        <div>
            <Typography variant='h6' sx={{ height: '2.5rem', display: 'flex', alignItems: 'center', pl: '1rem', color: 'white', borderBottomLeftRadius: '.2rem', borderBottomRightRadius: '.2rem', borderTopLeftRadius: '.2rem', borderTopRightRadius: '.2rem' }} className="bg-gradient-to-tr from-blue-600 to-blue-400">
                About the user
            </Typography>
        </div>
    )
}

export default UserDetails