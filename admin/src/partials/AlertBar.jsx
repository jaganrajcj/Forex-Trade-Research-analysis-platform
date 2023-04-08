import { Alert, Snackbar, Typography } from '@mui/material'

const AlertBar = ({ alert, setAlert }) => {

    const handleSnackbarClose = () => {
        setAlert({
            open: false
        })
    }
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ width: "400px", mt: '70px' }}
            open={alert?.open}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={alert?.severity || 'success'} sx={{ width: '80%', backgroundColor: 'white', color: alert?.severity == 'success' ? 'green' : 'red' }}>
                <Typography variant="small" sx={{ fontWeight: 200 }}>{alert?.message}</Typography>
            </Alert>
        </Snackbar>
    )
}

export default AlertBar