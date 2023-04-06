import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import useGetTheme from '@/hooks/useGetTheme';
import { Typography } from '@mui/material';

const Chart = ({ selectedPair }) => {

    const theme = useGetTheme()

    return (
        <div className="h-full w-full overflow-hidden relative mx-3 -mt-3">
            <div className={`w-full h-11 bg-white absolute z-50 border-b flex justify-center items-center`}>

                <Typography variant="h6" align="center" sx={{ color: '#666666', fontSize: '14px' }}>Chart</Typography>
            </div>
            <div className="w-full h-full border">
                <iframe height="100%" width="98%" className="rounded-sm" src="https://sslcharts.investing.com/index.php?force_lang=56&pair_ID=2&timescale=3600&candles=100&style=candles"></iframe>

            </div>
        </div>


    )
}

export default Chart