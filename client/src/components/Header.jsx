import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'
import { useSelector } from 'react-redux';

const Header = ({ title, subtitle }) => {
    const theme = useTheme();

    const mode = useSelector((state) => state.global.mode)

    return (
        <Box>
            <Typography
                variant="h5"
                color={mode === "dark" ? '#f5f5f5' : '#374151'}
                fontWeight="bold"
                sx={{ mb: "5px" }}
            >
                {title}
            </Typography>
            <Typography
                variant="h6"
                color={mode === "dark" ? '#e5e7eb' : '#4b5563'}

            >
                {subtitle}
            </Typography>
        </Box>

    )
}

export default Header