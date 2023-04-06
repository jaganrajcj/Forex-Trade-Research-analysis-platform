import Header from '@/components/Header'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import COT from './COT'
import InterestRate from './InterestRate'

const Fundamentals = () => {

    const theme = useTheme()

    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")

    return (

        <Box
            sx={{ mt: '20px', mb: '20px', mx: '1.5rem' }}
        >

            <Typography variant="h3" fontWeight="bold" color={theme.palette.secondary[100]}>FUNDAMENTALS</Typography>
            <Box
                mt="30px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    // backgroundColor: theme.palette.ternary[100],
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" }
                }}>
                <Box
                    gridColumn="span 3"
                    gridRow="span 1"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.background.alt}
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <COT />
                </Box>
                <Box
                    gridColumn="span 3"
                    gridRow="span 1"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.background.alt}
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <InterestRate />
                </Box>

            </Box>
        </Box>
    )
}

export default Fundamentals