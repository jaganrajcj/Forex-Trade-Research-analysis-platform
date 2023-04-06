import useGetTheme from '@/hooks/useGetTheme'
import { Box, Typography } from '@mui/material'
import React from 'react'

const RiskOfRuin = () => {

    const theme = useGetTheme()

    return (
        <Box sx={{ width: '100%', height: '100%', m: '1rem' }}>
            <Typography variant="h6" align="center" sx={{ color: theme.palette.secondary[200], fontSize: '14px' }}>RISK OF RUIN</Typography>
        </Box>
    )
}

export default RiskOfRuin