import React, { useEffect, useState } from 'react'
import CircularLoader from '../../partials/CircularLoader'
import { DataGrid } from '@mui/x-data-grid';
import useAuth from '@/hooks/useAuth'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"
import SummarizeIcon from '@mui/icons-material/Summarize';
import DownloadIcon from '@mui/icons-material/Download';
import AlertBar from '@/partials/AlertBar';

const ProUsers = () => {

    const [isLoading, setIsLoading] = useState(true)
    const { userData } = useAuth()
    const [users, setUsers] = useState([])
    const [deleteId, setDeleteId] = useState(null)
    const [confirmationPopup, setConfirmationPopup] = useState(false)
    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: 'Hello there'
    })

    const fetchUsers = () => {
        axios.get(import.meta.env.VITE_API_URL + '/administrative/users/pro',
            { headers: { "x-auth-token": userData.token } }
        ).then((res) => {

            setUsers(res.data)
            setIsLoading(false)

        }).catch((error) => {

            console.log(error.response)

        })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleDownloadButton = () => {
        // Get the headers (keys) from the first object
        const headers = Object.keys(users[0]);

        // Transform each object into a string of comma-separated values
        const csv = [
            headers.join(','), // Header row
            ...users.map(obj => headers.map(key => {
                const value = obj[key];
                return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
            }).join(','))
        ].join('\n');

        const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        const link = document.createElement('a');
        link.setAttribute('href', csvContent);
        link.setAttribute('download', 'premium-users.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16, backgroundColor: '#dc2626', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                    onClick={async () => {
                        const details = params
                        // console.log(details.id)
                        setDeleteId(details.id)
                        setConfirmationPopup(true)
                    }}
                >
                    {/* Delete Trade */}
                    <DeleteIcon fontSize="small" sx={{ color: 'white' }} />
                </Button>
            </strong>
        )
    }

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: .7,
        },
        {
            field: "name",
            headerName: "Username",
            flex: 0,
        },
        {
            field: "firstName",
            headerName: "First Name",

        },
        {
            field: "lastName",
            headerName: "Last Name",

        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            flex: 0.5,
        },
        {
            field: "phone",
            headerName: "Phone",
            flex: 0.5,
        },
        {
            field: "about",
            headerName: "About",
            flex: 0.5,
        },
        {
            field: "address1",
            headerName: "Address",
            flex: 0.5,
        },
        {
            field: "location",
            headerName: "Location",
            flex: 0.5,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            width: 180,
            align: 'center',
            renderCell: renderDetailsButton,
        },
    ]

    return (
        !isLoading ?
            <>
                <div className="px-4 sm:px-6 lg:px-6 py-8 w-full max-w-10xl mx-auto  h-[90%]">
                    <div className="flex justify-between items-center mb-3 w-full">
                        <h2 className="text-2xl font-bold capitalize">PREMIUM USERS</h2>
                        <Button variant="contained"
                            onClick={handleDownloadButton}
                        >
                            <DownloadIcon sx={{ mr: 2 }} />
                            Download
                        </Button>
                    </div>
                    <DataGrid
                        sx={{ width: '100%' }}
                        loading={isLoading || !users}
                        getRowId={(row) => row._id}
                        rows={users || []}
                        columns={columns}
                    />
                    {alert?.open && <AlertBar alert={alert} setAlert={setAlert} />}
                    <Dialog
                        open={confirmationPopup}
                        onClose={() => setConfirmationPopup(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Confirm account deletion"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                You are about to delete a user account, this action cannot be undone.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                setConfirmationPopup(false);
                                setDeleteId(null)
                            }}>
                                Cancel</Button>
                            <Button onClick={() => {
                                if (deleteId) {
                                    axios.post(import.meta.env.VITE_API_URL + '/administrative/deleteUser',
                                        { userId: deleteId },
                                        { headers: { "x-auth-token": userData.token } }
                                    ).then((res) => {
                                        if (res.data.status) {
                                            setAlert({
                                                open: true,
                                                severity: 'success',
                                                message: 'User deleted successfully'
                                            })
                                            fetchUsers()
                                        }
                                        else {
                                            setAlert({
                                                open: true,
                                                severity: 'error',
                                                message: 'User deletion failed!'
                                            })
                                        }
                                        setConfirmationPopup(false)
                                        setDeleteId(null)
                                    }).catch((error) => {
                                        console.log(error.response)
                                        setAlert({
                                            open: true,
                                            severity: 'error',
                                            message: 'User deletion failed!'
                                        })
                                        setConfirmationPopup(false)
                                        setDeleteId(null)
                                    })
                                }
                            }} color="error" >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </>
            : <CircularLoader />
    )
}

export default ProUsers