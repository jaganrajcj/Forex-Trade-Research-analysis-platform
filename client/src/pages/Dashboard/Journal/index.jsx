import { Box, Modal, Button, Typography, useTheme, Snackbar, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { DownloadOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add';
import FlexBetween from '@/components/FlexBetween'
import { darken, lighten } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTrade from './AddTrade';
import ErrorIcon from '@mui/icons-material/Error';
import { Button as MaterialButton, Tooltip } from "@material-tailwind/react";

import { journal } from '@/services/journal';

// Table components 
import { Tabulator } from 'tabulator-tables';

import { DataGrid } from '@mui/x-data-grid';
import useAuth from '@/hooks/useAuth';
import { useSelector } from 'react-redux';


const renderDetailsButton = (params) => {

    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16, backgroundColor: '#1d4ed8', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                onClick={() => {
                    const details = params
                    console.log(details)
                }}
            >
                <EditIcon fontSize="small" sx={{ color: 'white' }} />
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16, backgroundColor: '#dc2626', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                onClick={() => {
                    const details = params
                    console.log(details)
                }}
            >
                <DeleteIcon fontSize="small" sx={{ color: 'white' }} />
            </Button>
        </strong>
    )
}
const renderStatus = (params) => {
    return <strong>
        <Box sx={{
            bgcolor: params.row.status === 'Win' ? 'green' : 'red',
            py: '6px',
            px: '12px',
            color: 'white',
            width: '50px',
            borderRadius: '6px',
            textAlign: 'center'
        }}>
            {params.row.status}
        </Box>
    </strong>
}



const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

export const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 60,
        sortable: false,
        align: 'center'
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 150,

        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'direction',
        headerName: 'Direction',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'market',
        headerName: 'Market',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'entry',
        headerName: 'Entry Price',
        type: 'number',
        sortable: false,
        editable: false,
        align: 'center'
    },
    {
        field: 'balance',
        headerName: 'Balance',
        sortable: false,
        width: 150,

        align: 'center'
    },
    {
        field: 'size',
        headerName: 'Lot Size',
        sortable: false,
        width: 70,
        align: 'center'
        // renderCell: renderDetailsButton,
    },
    {
        field: 'sl',
        headerName: 'Stop Loss',
        type: 'number',
        editable: true,
        flex: 0,
        align: 'center'
    },
    {
        field: 'target',
        headerName: 'Target',
        type: 'number',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'exit',
        headerName: 'Actual Exit',
        type: 'number',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'closedPnl',
        headerName: 'Closed Pnl',
        type: 'number',
        sortable: false,
        editable: true,
        align: 'center'
    },
    {
        field: 'change',
        headerName: 'Account Change',
        type: 'number',
        sortable: false,
        width: 150,
        editable: true,
        align: 'center'
    },
    {
        field: 'status',
        headerName: 'Status',
        sortable: false,
        editable: true,
        align: 'center',
        renderCell: renderStatus,
    },
    {
        field: 'notes',
        headerName: 'Notes',
        sortable: false,
        width: 200,
        editable: true,
        align: 'center'
    },
    {
        field: 'edit',
        headerName: 'Edit',
        sortable: false,
        width: 180,
        align: 'center',
        renderCell: renderDetailsButton,
    },
];
// export const rows = [
//     { id: 1, date: '2015-10-11', direction: "Long", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
//     { id: 2, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
//     { id: 3, date: '2015-10-11', direction: "Long", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: -100, change: 1, status: 'Loss', note: null },
//     { id: 4, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
//     { id: 5, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: -100, change: 1, status: 'Loss', note: null },
//     { id: 6, date: '2015-10-11', direction: "Long", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
//     { id: 7, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: -100, change: 1, status: 'Loss', note: null },
//     { id: 8, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
//     { id: 9, date: '2015-10-11', direction: "Long", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null },
//     { id: 10, date: '2015-10-11', direction: "Short", market: 'EURUSD', entry: 1.00, balance: 10000, size: 1.00, sl: 0.95, target: 1.05, exit: 1.05, pnl: 100, change: 1, status: 'Win', note: null }

// ];



const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Journal = () => {



    const { userData } = useAuth()
    const [modalOpen, setModalOpen] = useState(false)
    const theme = useTheme()
    const [trades, setTrades] = useState([])
    const mode = useSelector((state) => state.global.mode)

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: ''
    })
    const handleSnackbarClose = () => {
        setSnackbar({
            open: false
        })
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }
    useEffect(() => {
        journal.getTrades(userData).then((result) => {
            // console.log(result)
            setTrades(result.data.journal.trades)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <Box sx={{ border: 0, px: '.3rem', py: '.4rem' }}>
            <FlexBetween sx={{ mb: '40px' }}>
                <Header title="JOURNAL" subtitle="Trade Journal" />
                <Box>
                    <MaterialButton
                        variant='gradient'
                        sx={{
                            // backgroundColor: theme.palette.secondary.light,
                            // color: theme.palette.background.alt,
                            // fontSize: "14px",
                            // fontWeight: "bold",
                            // padding: "10px 20px",
                            mr: '2rem'
                        }}
                        className="items-center mr-2"
                        // style={}
                        onClick={() => setModalOpen(true)}
                    >
                        <AddIcon sx={{ mr: "10px" }} />
                        <span className='mt-1'>Add New</span>
                    </MaterialButton>
                </Box>
            </FlexBetween>

            {/* Add trade */}
            <AddTrade modalOpen={modalOpen} handleModalClose={handleModalClose} setTrades={setTrades} setSnackbar={setSnackbar} />
            <Box height="67vh">
                <div id="example-table"></div>
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    mt: '2rem',

                    '& .super-app-theme--Win': {
                        '[data-colindex="9"]': {
                            color: '#16a34a',
                            fontWeight: 'bold'
                        },

                        '[data-colindex="10"]': {
                            color: '#16a34a',
                            fontWeight: 'bold'
                        },

                    },

                    '& .super-app-theme--Loss': {
                        '[data-colindex="9"]': {
                            color: '#dc2626',
                            fontWeight: 'bold'
                        },
                        '[data-colindex="10"]': {
                            color: '#dc2626',
                            fontWeight: 'bold'
                        },

                    },
                }}>
                    <DataGrid
                        rows={trades}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        // checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        getRowClassName={(params) => `super-app-theme--${params.row.status}`}
                        sx={{
                            textAlign: 'center',
                            color: mode === "dark" ? 'white' : 'black'
                        }}
                    />
                </Box>
            </Box>

            {/* Insert trade modal */}
            {/* <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal> */}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ width: "400px", mt: '70px' }}
                open={snackbar?.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar?.severity || 'success'} sx={{ width: '80%', backgroundColor: 'white', color: snackbar?.severity == 'success' ? 'green' : 'red' }}>
                    <Typography variant="h6" sx={{ fontWeight: 200 }}>{snackbar?.message}</Typography>
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Journal