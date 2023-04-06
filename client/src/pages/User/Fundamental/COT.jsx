import useGetTheme from '@/hooks/useGetTheme'
import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';

const COT = ({ selectedPair }) => {

    const theme = useGetTheme()
    const { userData } = useAuth()
    const [cotReport, setCOTReport] = useState({})


    const baseCurrency = selectedPair.substring(0, 3).toLowerCase(); // get the first three characters as the base currency
    const quoteCurrency = selectedPair.substring(3, 6).toLowerCase(); // get the last three characters as the quote currency

    // Fetch commitment of traders report for the selected pair
    const fetchCOTReport = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + `/analysis/fundamental/cot?market=${selectedPair.toLowerCase()}`,
                { headers: { "x-auth-token": userData.token } })

            if (res.status) setCOTReport(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchCOTReport()
    }, [selectedPair])

    useEffect(() => {
        // console.log(cotReport)
    }, [cotReport])

    return (
        <div className={`m-3`}>
            <Typography variant="h6" align="center" sx={{ color: theme.palette.secondary[200], fontSize: '14px' }}>Commitment of traders report for {baseCurrency.toUpperCase()} & {quoteCurrency.toUpperCase()}</Typography>
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
                            <TableCell>Commodity</TableCell>
                            <TableCell align="right">52-W High</TableCell>
                            <TableCell align="right">52-W Low</TableCell>
                            <TableCell align="right">Net Positions</TableCell>
                            <TableCell align="right">NET Change</TableCell>
                            <TableCell align="right">Long Positions</TableCell>
                            <TableCell align="right">Short Positions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.keys(cotReport).length &&
                            Object.keys(cotReport).map((row, index) => (
                                < TableRow
                                    key={cotReport[row]?.Commodity}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '& th, td': {
                                            color: theme.palette.secondary[100],
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">{cotReport[row]?.Commodity || 'Loading...'}</TableCell>
                                    <TableCell align="right" style={{ color: parseFloat(cotReport[row]['52W High']) > 0 ? 'green' : (parseFloat(cotReport[row]['52W High']) < 0 ? 'red' : null) }}>{cotReport[row]['52W High'] || 0}</TableCell>
                                    <TableCell align="right" style={{ color: parseFloat(cotReport[row]['52W Low']) > 0 ? 'green' : (parseFloat(cotReport[row]['52W Low']) < 0 ? 'red' : null) }}>{cotReport[row]['52W Low'] || 0}</TableCell>
                                    <TableCell align="right" style={{ color: parseFloat(cotReport[row]['Net Positions']) > 0 ? 'green' : (parseFloat(cotReport[row]['Net Positions']) < 0 ? 'red' : null) }}>{cotReport[row]['Net Positions'] || 0}</TableCell>
                                    <TableCell align="right" style={{ color: parseFloat(cotReport[row]['Net Change']) > 0 ? 'green' : (parseFloat(cotReport[row]['Net Change']) < 0 ? 'red' : null) }}>{cotReport[row]['Net Change'] || 0}</TableCell>
                                    <TableCell align="right" style={{ color: parseFloat(cotReport[row]['Long Positions']) > 0 ? 'green' : (parseFloat(cotReport[row]['Long Positions']) < 0 ? 'red' : null) }}>{cotReport[row]['Long Positions'] || 0}</TableCell>
                                    <TableCell align="right" style={{ color: parseFloat(cotReport[row]['Short Positions']) > 0 ? 'green' : (parseFloat(cotReport[row]['Short Positions']) < 0 ? 'red' : null) }}>{cotReport[row]['Short Positions'] || 0}</TableCell>

                                </TableRow>
                            ))
                        }
                        {/* {tableData.map((row) => (
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
                            ))} */}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default COT