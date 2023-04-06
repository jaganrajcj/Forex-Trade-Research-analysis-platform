import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Alert, AppBar, Box, CircularProgress, Snackbar, Typography as Typo } from '@mui/material';
import logo from "@/assets/logoDark.png";
import { useTheme } from '@mui/material/styles';
// import LogUser from './login'
import { useNavigate } from 'react-router-dom';
import UserContext from "@/context/userContext"
import { authService } from "@/services/authService"
import jwt_decode from "jwt-decode";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validEmail, setValidEmail] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [rememberMe, setRememberMe] = useState(false)
    const { setUserData, userData } = useContext(UserContext)
    const [circularLoading, setCircularLoading] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        // console.log('User data: ', userData)
        console.count("🚀 ~ file: index.jsx:35 ~ useEffect ~ userData:", userData)
        if (userData.token) {
            setSnackbarInfo({
                open: true,
                severity: 'success',
                message: 'You are already logged in',
                textColor: 'green'
            })

            const decoded = jwt_decode(userData.token)
            setTimeout(() => {

                switch (decoded.user.type) {
                    case 2000:
                        navigate('/dashboard/')
                        break
                    case 2300:
                        navigate('/moderator/')
                        break
                    case 2400:
                        navigate('/admin/')
                        break
                    default:
                        console.log("Invalid type from decoded JWT!")
                }
            }, 3000)

        }
    }, [userData])

    const [snackbarInfo, setSnackbarInfo] = useState({
        open: false,
        severity: 'error',
        message: '',
        textColor: 'red'
    })
    const [error, setError] = useState({
        status: false,
        severity: 'error',
        message: 'Invalid username or password'
    })

    const handleLoginError = (err) => {
        setCircularLoading(false)
        if (err.code === "ERR_NETWORK") {
            setSnackbarInfo({
                open: true,
                severity: 'error',
                message: 'Network Error'
            })
        }
        else {
            setError({
                status: true,
                severity: 'error',
                message: err.response.data.message
            })
        }
    }
    const handleSnackBarClose = () => {
        setSnackbarInfo({
            open: false,
            severity: 'error',
            message: 'Network Error'
        })
    }

    const handleEmail = (e) => {
        setEmail(e)
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) setValidEmail(false)
        else setValidEmail(true)
    }

    useEffect(() => {
        handleEmail(email)
    }, [email])



    return (
        <>
            <img
                src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2130&q=80"
                className="absolute inset-0 z-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
            <div className="container mx-auto p-4">
                <AppBar position="relative" color="transparent" sx={{
                    px: '50px', backgroundColor: 'transparent', width: '100%', height: '100px', zIndex: 1300, display: 'flex', flexDirection: 'row', boxShadow: 0, justifyContent: 'space-between', alignItems: 'center'
                }}>
                    < Box sx={{ width: '144px', height: '40px' }} component="img" src={logo} />
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <Link to="/">
                            <Typo variant="h5" sx={{ color: theme.palette.secondary[600] }}>Home</Typo>
                        </Link>
                        <Link to="/signup">
                            <Typo variant="h5" sx={{ color: theme.palette.secondary[600] }}>Sign Up</Typo>
                        </Link>
                    </Box>
                </AppBar>
                <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4" >
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">

                            Sign In
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        {error.status && <Alert variant="filled" sx={{ height: '45px', display: 'flex', alignItems: 'center' }} severity={error.severity}>{error.message}</Alert>}
                        {!validEmail && <Alert variant='string' sx={{ color: 'red', height: '45px' }}>Enter a valid email</Alert>}
                        <Input autoFocus onChange={(e) => handleEmail(e.target.value)} variant="standard" error={!validEmail} type="email" label="Email" size="lg" />
                        <Input

                            onChange={(e) => setPassword(e.target.value)}
                            error={!validPassword}
                            variant="standard"
                            type="password"
                            label="Password"
                            size="lg"
                        />
                        <div className="-ml-2.5">
                            <Checkbox label="Remember Me" onClick={(e) => setRememberMe(!rememberMe)} />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth
                            sx={{ display: 'flex', alignItems: 'center', justify: 'center' }}
                            onClick={() => {
                                // console.log(Boolean(password.length));
                                setCircularLoading(true);
                                (!Boolean(password.length)) ? setValidPassword(false) : setValidPassword(true);
                                (email.length && password.length && validEmail) && authService.Login(email, password, rememberMe, navigate, setError, handleLoginError, setUserData, userData)
                            }}>
                            {circularLoading && <CircularProgress size="15px" color="inherit" sx={{ mr: '.5rem', mb: '-4px' }} />}
                            Sign In
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Don't have an account?
                            <Link to="/signup">
                                <Typography
                                    as="span"
                                    variant="small"
                                    color="blue"
                                    className="ml-1 font-bold"
                                >
                                    Sign up
                                </Typography>
                            </Link>
                        </Typography>
                    </CardFooter>
                </Card>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{ width: "350px", mt: '75px' }}
                    open={snackbarInfo.open}
                    message="Snackbar"
                    onClose={handleSnackBarClose}
                    autoHideDuration={5000}
                >
                    <Alert onClose={handleSnackBarClose} severity={snackbarInfo.severity} sx={{ width: '100%', backgroundColor: 'white', color: snackbarInfo?.textColor ? snackbarInfo.textColor : 'red', display: 'flex', alignItems: 'center' }}>
                        {snackbarInfo.message}
                    </Alert>
                </Snackbar>
            </div>

        </>
    )
}

export default Login