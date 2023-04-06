import { Alert, Typography } from '@mui/material'
import React, { useState } from 'react'

const Snackbar = ({ info }) => {

    const [snackbar, setSnackbar] = useState(info)

    const handleSnackbarClose = () => {
        setSnackbar({
            open: false
        })
    }
    return (
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
    )
}

export default Snackbar