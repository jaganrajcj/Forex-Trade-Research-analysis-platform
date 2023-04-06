import { Box, useTheme } from '@mui/material'
import React from 'react'

const SalesChart = () => {

    const theme = useTheme()

    return (
        <Box
            gridColumn="span 8"
            gridRow="span 3"
            backgroundColor={theme.palette.background.alt}
        >

        </Box>
    )
}

export default SalesChart