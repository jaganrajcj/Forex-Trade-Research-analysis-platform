import useAuth from '@/hooks/useAuth'
import React, { useEffect, useState, useRef } from 'react'
import { adminServices } from '@/services/adminServices'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Alert, Button, Modal, Snackbar, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

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
        flex: 0.5,
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
    }


]

const Users = () => {

    const [users, setUsers] = useState([])
    const [userLoading, setUserLoading] = useState(true)
    const { userData } = useAuth()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteInput, setDeleteInput] = useState('none')
    const [deleteInputValue, setDeleteInputValue] = useState('')
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
    const fetchData = () => {
        adminServices.getUsers(userData).then((users) => {
            if (users.length) {
                setUsers(users)
                // console.log(users)
            }

            setUserLoading(false)

        }).catch((err) => {
            console.log("User fetch error:" + err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    // useEffect(() => {
    //     if (JSON.stringify(users) != '{}') {

    //         console.log('User fetched', users)
    //     }
    //     else console.log('Still fetching')

    // }, [users])

    // console.log(users)

    // Handler Functions
    const handleDeleteButton = () => {
        // setDeleteModalOpen(true)
        if (!deleteInputValue) setDeleteInput('')

        else {
            adminServices.deleteUser(userData, deleteInputValue).then((res) => {
                if (res.status) {
                    setSnackbar({
                        open: true,
                        severity: 'success',
                        message: 'User successfully deleted'
                    })
                    fetchData()
                }
                else setSnackbar({
                    open: true,
                    severity: 'error',
                    message: 'Failed to delete user'
                })
            })
            setDeleteInputValue('')
            // console.log(deleteVal.current)
        }
    }

    return (
        <Box sx={{ height: '80%', width: '95%', mx: '2em', my: '2em', gap: '1rem' }}>

            <Box sx={{ border: 0, py: '1rem' }}>
                <TextField size="small" sx={{ display: deleteInput, mr: '1rem' }} value={deleteInputValue} className="deleteInput" onChange={(e) => setDeleteInputValue(e.target.value)} color="error" id="outlined-basic" label="ID" variant="outlined" />
                <Button variant="contained" color="error" onClick={handleDeleteButton} startIcon={<DeleteIcon />}>Delete</Button>
            </Box>


            <DataGrid
                loading={userLoading || !users}
                getRowId={(row) => row._id}
                rows={users || []}
                columns={columns}
            />

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ width: "300px", mt: '70px' }}
                open={snackbar?.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar?.severity || 'success'} sx={{ width: '100%', backgroundColor: 'white', color: snackbar?.severity == 'success' ? 'green' : 'red' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'light' }}>{snackbar?.message}</Typography>
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Users