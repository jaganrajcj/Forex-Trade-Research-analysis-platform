import React, { useEffect, useState } from 'react'
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
import SvgIcon from '@mui/material/SvgIcon';
import { AppBar, Box, Typography as Typo, Alert, Snackbar } from '@mui/material';
import logo from "@/assets/logoDark.png";
import { useTheme } from '@mui/material/styles';
import { authService } from "@/services/authService"
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [acceptTerms, setAcceptTerms] = useState(false)

    const [validName, setValidName] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [validConfirmPassword, setValidConfirmPassword] = useState(true)

    const [validationError, setValidationError] = useState({
        status: false,
        severity: 'warning',
        message: ''
    })
    const [snackbarInfo, setSnackbarInfo] = useState({
        open: false,
        severity: 'error',
        message: ''
    })

    const handleRegistrationError = (err) => {
        if (err.code === "ERR_NETWORK") {
            setSnackbarInfo({
                open: true,
                severity: 'error',
                message: 'Network Error'
            })
        }
        else {
            setValidationError({
                status: true,
                severity: 'error',
                message: err.response.data.message
            })
        }
    }

    const successCallback = () => {
        setSnackbarInfo({
            open: true,
            severity: 'success',
            message: 'Registration successful'
        })
        let seconds = 3;
        setInterval(() => {
            seconds--
            setSnackbarInfo({
                open: true,
                severity: 'success',
                message: `Registration successful (${seconds})`
            })
            if (seconds == 0) {
                navigate('/signin')
            }
        }, 1000)
    }
    const handleSnackBarClose = () => {
        setSnackbarInfo({
            open: false,
            severity: 'error',
            message: 'Network Error'
        })
    }

    const handleNameChange = (e) => {
        setName(e)
        const filter = /^([a-zA-Z]{3,30}\s*)+$/
        if (!filter.test(e)) {
            setValidName(false)
            setValidationError({
                status: true,
                severity: 'warning',
                message: 'Name must be 3 to 30 characters long'
            })
        }
        else {
            setValidName(true)
            setValidationError({
                status: false,
                severity: 'warning',
                message: 'Name must be 3 to 30 characters long!'
            })
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e)
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            setValidEmail(false)
            setValidationError({
                status: true,
                severity: 'warning',
                message: 'Invalid email format!'
            })
        }
        else {
            setValidEmail(true)
            setValidationError({
                status: false,
            })
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e)
        // console.log(password)
        const filter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/
        if (!filter.test(e)) {
            setValidPassword(false)
            setValidationError({
                status: true,
                severity: 'warning',
                message: 'password must be 8 characters long, must contain one number!'
            })
        }
        else {
            setValidPassword(true)
            setValidationError({
                status: false,
            })
        }
    }
    // const handleConfirmPassChange = (e) => {
    //     console.log(confirmPassword)
    //     setConfirmPassword(e)
    // }

    useEffect(() => {
        if (password != confirmPassword) {
            setValidConfirmPassword(false)
            setValidationError({
                status: true,
                severity: 'warning',
                message: 'Password does not match!'
            })
        }
        else {
            setValidConfirmPassword(true)
            setValidationError({
                status: false
            })
        }
    }, [confirmPassword])


    const theme = useTheme()
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
                        <Link to="/signin">
                            <Typo variant="h5" sx={{ color: theme.palette.secondary[600] }}>Sign In</Typo>
                        </Link>
                    </Box>
                </AppBar>
                <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">

                            Sign Up
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        {validationError.status && <Alert variant="string" sx={{ height: '45px', display: 'flex', alignItems: 'center', color: 'red', mt: '-20px' }} severity={validationError.severity}>{validationError.message}</Alert>}
                        <Input variant="standard" label="Name" size="lg" error={!validName} onChange={(e) => handleNameChange(e.target.value)} />
                        <Input variant="standard" type="email" label="Email" size="lg" error={!validEmail} onChange={(e) => handleEmailChange(e.target.value)} />
                        <Input
                            variant="standard"
                            type="password"
                            label="Password"
                            size="lg"
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            error={!validPassword}
                        />
                        <Input
                            variant="standard"
                            type="password"
                            label="Confirm Password"
                            size="lg"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={!validConfirmPassword}
                        />
                        <div className="-ml-2.5">
                            <Checkbox label="I agree the Terms and Conditions"
                                checked={acceptTerms}
                                onChange={() => { setAcceptTerms(!acceptTerms) }}
                            />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth
                            onClick={() => {
                                if (!acceptTerms) setValidationError({
                                    status: true,
                                    severity: 'warning',
                                    message: 'Please accept the terms and conditions to proceed further!'
                                })
                                else (name.length && email.length && password.length && confirmPassword.length && acceptTerms && validName && validEmail && validPassword && validConfirmPassword) && authService.Register(name, email, password, handleRegistrationError, successCallback)
                            }}
                        >
                            Sign Up
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Already have an account?
                            <Link to="/signin">
                                <Typography
                                    as="span"
                                    variant="small"
                                    color="blue"
                                    className="ml-1 font-bold"
                                >
                                    Sign in
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
                    <Alert onClose={handleSnackBarClose} severity={snackbarInfo.severity} sx={{ width: '100%', backgroundColor: 'white', color: snackbarInfo.severity == 'error' ? 'red' : 'green', display: 'flex', alignItems: 'center' }}>
                        {snackbarInfo.message}
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default Register