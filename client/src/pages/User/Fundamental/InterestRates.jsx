import useAuth from '@/hooks/useAuth'
import useGetTheme from '@/hooks/useGetTheme'
import { Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const InterestRates = ({ selectedPair }) => {

    const theme = useGetTheme()
    const { userData } = useAuth()
    const [rates, setRates] = useState({})

    const baseCurrency = selectedPair.substring(0, 3).toLowerCase(); // get the first three characters as the base currency
    const quoteCurrency = selectedPair.substring(3, 6).toLowerCase(); // get the last three characters as the quote currency


    // Fetch interest rates
    const fetchRates = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + `/analysis/fundamental/interest-rates?market=${selectedPair.toLowerCase()}`,
                { headers: { "x-auth-token": userData.token } })

            if (res.status == 200) setRates(res.data)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchRates()
    }, [selectedPair])

    useEffect(() => {
        console.log(rates)
    }, [rates])

    return (
        <div className={`m-3`}>
            <Typography variant="h6" align="center" sx={{ color: theme.palette.secondary[200], fontSize: '14px' }}>Interest Rates for {baseCurrency.toUpperCase()} & {quoteCurrency.toUpperCase()}</Typography>
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
                            <TableCell align="right">Current Rate</TableCell>
                            <TableCell align="right">Rate Direction</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        Object.keys(rates).length &&
                        <TableBody>
                            <TableRow
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '& th, td': {
                                        color: theme.palette.secondary[100],
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">{rates[baseCurrency]?.country || 'Loading...'}</TableCell>
                                <TableCell align="right" style={{ color: parseFloat(rates[baseCurrency]?.rate) > 0 ? 'green' : (parseFloat(rates[baseCurrency]?.rate) < 0 ? 'red' : null) }}>{rates[baseCurrency]?.rate || 0}</TableCell>
                                <TableCell align="right" style={{ color: parseFloat(rates[quoteCurrency]?.rate) > 0 ? 'red' : (parseFloat(rates[quoteCurrency]?.rate) < 0 ? 'green' : null) }}>
                                    <div className='flex flex-row justify-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                        </svg>

                                    </div>
                                </TableCell>
                            </TableRow>


                            <TableRow
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '& th, td': {
                                        color: theme.palette.secondary[100],
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">{rates[quoteCurrency]?.country || 'Loading...'}</TableCell>
                                <TableCell align="right" style={{ color: parseFloat(rates[quoteCurrency]?.rate) > 0 ? 'green' : (parseFloat(rates[quoteCurrency]?.rate) < 0 ? 'red' : null) }}>{rates[quoteCurrency]?.rate || 0}</TableCell>
                                <TableCell align="right" style={{ color: parseFloat(rates[quoteCurrency]?.rate) > 0 ? 'green' : (parseFloat(rates[quoteCurrency]?.rate) < 0 ? 'red' : null) }}>
                                    <div className='flex flex-row justify-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                        </svg>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    }
                </Table>
            </TableContainer>
        </div>
    )
}

export default InterestRates