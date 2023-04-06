import ErrorBoundary from '@/components/ErrorBoundary';
import useGetTheme from '@/hooks/useGetTheme';
import { Box, Skeleton, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ProfitPerPair = ({ trades }) => {


    const [isLoading, setIsLoading] = useState(true)
    const [tableData, setTableData] = useState([])
    const theme = useGetTheme()

    const forexPairs = ["EURUSD", "USDJPY", "GBPUSD", "USDCHF", "AUDUSD", "USDCAD", "NZDUSD", "EURJPY", "GBPJPY", "AUDJPY", "CADJPY", "NZDJPY", "EURGBP", "GBPCHF", "EURCHF", "AUDCHF", "NZDCHF", "EURAUD", "EURCAD", "EURNZD"];


    const data = [
        {
            "pair": "GBPUSD",
            "closedPnl": 70
        },
        {
            "pair": "GBPJPY",
            "closedPnl": 150
        },
        {
            "pair": "NZDCHF",
            "closedPnl": 97
        },
        {
            "pair": "GBPUSD",
            "closedPnl": -120
        },
        {
            "pair": "EURUSD",
            "closedPnl": -146
        },
        {
            "pair": "EURAUD",
            "closedPnl": 23
        },
        {
            "pair": "USDJPY",
            "closedPnl": -107
        },
        {
            "pair": "AUDJPY",
            "closedPnl": 147
        },
        {
            "pair": "CADJPY",
            "closedPnl": -80
        },
        {
            "pair": "GBPUSD",
            "closedPnl": 128
        },
        {
            "pair": "AUDUSD",
            "closedPnl": 125
        },
        {
            "pair": "GBPUSD",
            "closedPnl": -108
        },
        {
            "pair": "EURUSD",
            "closedPnl": 198
        },
        {
            "pair": "NZDJPY",
            "closedPnl": 244
        },
        {
            "pair": "NZDUSD",
            "closedPnl": -31
        },
        {
            "pair": "CADJPY",
            "closedPnl": 102
        },
        {
            "pair": "AUDUSD",
            "closedPnl": 48
        },
        {
            "pair": "EURCAD",
            "closedPnl": 245
        },
        {
            "pair": "USDCHF",
            "closedPnl": 73
        },
        {
            "pair": "USDCAD",
            "closedPnl": 186
        }
    ]

    // for (let i = 0; i < 20; i++) {
    //     const pair = generateRandomForexPair();
    //     const closedPnl = generateRandomClosedPnl();
    //     data.push({ pair, closedPnl });
    // }
    function generateMaxGainLossArray(inputArray) {
        // Create a new object to store our results
        const resultObject = {};

        // Loop over each object in the input array
        inputArray.forEach((obj) => {
            const { market, closedPnl } = obj;

            // If this market is not yet in our result object, initialize it with default values
            if (!resultObject[market]) {
                resultObject[market] = {
                    market,
                    maxGain: 0,
                    maxLoss: 0,
                    netGain: 0
                };
            }

            resultObject[market].netGain += closedPnl

            // If the closedPnl is positive and greater than the current maxGain, update maxGain
            if (closedPnl > 0 && closedPnl > resultObject[market].maxGain) {
                resultObject[market].maxGain = closedPnl;
            }

            // If the closedPnl is negative and less than the current maxLoss, update maxLoss
            if (closedPnl < 0 && closedPnl < resultObject[market].maxLoss) {
                resultObject[market].maxLoss = closedPnl;
            }
        });

        // Convert our result object to an array and return it
        setIsLoading(false)
        return Object.values(resultObject);
    }

    useMemo(() => {
        if (trades?.length > 0) {

            setTableData(generateMaxGainLossArray(trades))
            console.log("Output", generateMaxGainLossArray(trades))
            console.log("trades: ", trades)
        }
    }, [trades])


    // console.log(data);

    // let profitPerMarket = []
    // data.forEach((item) => {
    //     const { pair, closedPnl } = item

    //     if (!profitPerMarket[pair]) profitPerMarket[pair] = 0

    //     profitPerMarket[pair] += closedPnl

    // })
    // console.log(profitPerMarket)


    return (
        !isLoading ?
            <div className={`w-[96%] h-[90%] m-[1rem] overflow-y-auto scrollbar-thin scrollbar-thumb-[#359AEF] scrollbar-track-[${theme.palette.custom[300]}] scrollbar-thumb-rounded`}>
                <Typography variant="h6" align="center" sx={{ color: theme.palette.secondary[200], fontSize: '14px' }}>PROFIT/LOSS PER PAIR</Typography>
                <TableContainer>
                    <Table sx={{ width: '95%', backgroundColor: 'transparent', divShadow: '0', height: '100%', mt: '0rem' }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{
                                '& th': {
                                    color: theme.palette.secondary[100],
                                    fontWeight: 'bold',
                                    transform: 'capitalize'
                                },
                            }}>
                                <TableCell>MARKET</TableCell>
                                <TableCell align="right">MAX GAIN</TableCell>
                                <TableCell align="right">MAX LOSS</TableCell>
                                <TableCell align="right">NET GAIN</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                < TableRow
                                    key={row?.market}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '& th, td': {
                                            color: theme.palette.secondary[100],
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">{row?.market}</TableCell>
                                    <TableCell align="right" style={{ color: row?.maxGain > 0 ? 'green' : (row?.maxGain < 0 ? 'red' : null) }}>{row?.maxGain}</TableCell>
                                    <TableCell align="right" style={{ color: row?.maxLoss > 0 ? 'green' : (row?.maxLoss < 0 ? 'red' : null) }}>{row?.maxLoss}</TableCell>
                                    <TableCell align="right" style={{ color: row?.netGain > 0 ? 'green' : (row?.netGain < 0 ? 'red' : null) }}>{row?.netGain}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            : <Skeleton sx={{ borderRadius: '.7rem' }} variant="rounded" animation="wave" width="100%" height='100%' />
    )

}

export default ProfitPerPair