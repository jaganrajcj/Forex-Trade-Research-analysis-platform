import React from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import COTUpdate from './COTUpdate'
import InterestRateUpdate from './InterestRateUpdate'


const Analysis = () => {

    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")

    return (
        <div className="px-4 sm:px-6 lg:px-6 py-8 w-full max-w-10xl mx-auto  h-[90%]">
            <div className="flex justify-between items-center mb-3 w-full">
                <h2 className="text-2xl font-bold capitalize">ANALYSIS</h2>
            </div>
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

                    backgroundColor="#FFFFFF"
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <COTUpdate />
                </Box>
                <Box
                    gridColumn="span 3"
                    gridRow="span 1"

                    backgroundColor="#FFFFFF"
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <InterestRateUpdate />
                </Box>

            </Box>
        </div>
    )
}

export default Analysis