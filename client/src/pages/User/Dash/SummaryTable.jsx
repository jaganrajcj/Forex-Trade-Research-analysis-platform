import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '@/components/Header';
import useGetTheme from '@/hooks/useGetTheme';
import { Box } from '@mui/material';

const SummaryTable = ({ trades }) => {

    const theme = useGetTheme()
    const [isLoading, setIsLoading] = useState(true)

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [];
    const [tableRows, setTableRows] = useState([])

    const setRows = () => {
        if (!trades?.length) return []

        let len = trades.length - 1

        for (let i = len; i > len - 9; i--) {
            if (!trades[i]) break
            rows.push(trades[i])
        }
        setTableRows(rows)
        setIsLoading(false)
    }

    useEffect(() => {
        setRows()
    }, [trades])

    return (
        !isLoading &&
        <Box color={theme.palette.secondary[100]}>
            <TableContainer>
                <Table sx={{ minWidth: 650, backgroundColor: 'transparent', boxShadow: '0', height: '100%', mt: '1rem' }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{
                            '& th': {
                                color: theme.palette.secondary[100],
                                fontWeight: 'bold',
                                transform: 'capitalize'
                            },

                        }}>
                            <TableCell>MARKET</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Direction</TableCell>
                            <TableCell align="right">Entry</TableCell>
                            <TableCell align="right">SL</TableCell>
                            <TableCell align="right">Exit</TableCell>
                            <TableCell align="right">PnL</TableCell>
                            <TableCell align="right">Change</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {tableRows.map((row) => (

                            < TableRow
                                key={row?.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '& th, td': {
                                        color: theme.palette.secondary[100],
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">{row?.market}</TableCell>
                                <TableCell align="right">{row?.date}</TableCell>
                                <TableCell align="right">{row?.direction}</TableCell>
                                <TableCell align="right">{row?.entry}</TableCell>
                                <TableCell align="right">{row?.sl}</TableCell>
                                <TableCell align="right">{row?.exit}</TableCell>
                                <TableCell align="right" style={{ color: row?.closedPnl > 0 ? 'green' : 'red' }}>{row?.closedPnl}</TableCell>
                                <TableCell align="right" style={{ color: row?.closedPnl > 0 ? 'green' : 'red' }}>{row?.change}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    )
}

export default SummaryTable