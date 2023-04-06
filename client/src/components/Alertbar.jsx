import { Alert, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'

const AlertBar = ({ info }) => {

    const [snackbar, setSnackbar] = useState(info)

    const handleSnackbarClose = () => {
        setSnackbar({
            open: false
        })
    }
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ width: "400px", mt: '70px' }}
            open={snackbar?.open}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbar?.severity || 'success'} sx={{ width: '80%', backgroundColor: 'white', color: snackbar?.severity == 'success' ? 'green' : 'red' }}>
                <Typography variant="small" sx={{ fontWeight: 200 }}>{snackbar?.message}</Typography>
            </Alert>
        </Snackbar>
    )
}

export default AlertBar