import React, { useEffect, useMemo, useRef, useState } from 'react'
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { Alert, Autocomplete, Button, Snackbar, useMediaQuery, useTheme } from '@mui/material'
import { Typography, Textarea, Tooltip } from '@material-tailwind/react';
import FlexBetween from '@/components/FlexBetween';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextareaAutosize } from '@mui/base';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { Input } from "@material-tailwind/react";
import ErrorIcon from '@mui/icons-material/Error';
import { Button as MaterialButton } from "@material-tailwind/react";
import Grow from '@mui/material/Grow';
import { authService } from '@/services/authService'

// import SnackBar from '@/components/SnackBar';


const ProfileEdit = ({ mode, user, fontColor, fetchUser }) => {

    const theme = useTheme()
    const [isSaving, setIsSaving] = useState(false)
    const [isValueChanged, setIsValueChanged] = useState(true)
    const [isCountryListLoading, setIsCountryListLoading] = useState(true)
    // const [userInfo, setUserInfo] = useState({})
    const userInfo = {}
    // console.log(userInfo)
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const { userData } = useAuth()
    const textRef = useRef()

    const [errors, setErrors] = useState({})
    const [updated, setUpdated] = useState({})
    const [passwordPopup, setPasswordPopup] = useState(false)
    const [isPasswordUpdating, setIsPasswordUpdating] = useState(false)
    const [passwords, setPasswords] = useState({})
    const [passwordErrors, setPasswordErrors] = useState({})

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

    const countryList = []
    useMemo(() => {
        axios.get('https://restcountries.com/v2/all').then((countries) => {
            // setIsCountryListLoading(false);
            countries.data.forEach(country => {
                // setCountryList(...countryList, country.name)
                countryList.push(country.name)
            });
        })
    }, [])

    const updateLocation = () => {
        console.log(textRef.current.value)
        userInfo.location = textRef.current.value
    }

    const handleSave = async () => {


        if (textRef.current.value != user?.location) setUpdated({ ...updated, location: textRef.current.value });

        // if (Object.keys(userInfo).length === 0) return false

        // console.log("User info: ", userInfo)
        // console.log(textRef.current.value);
        if (Object.keys(updated).length > 0) {
            let isError = false
            // console.log('Inserting trade data')
            Object.keys(errors).forEach((err) => {
                // console.log(errors[err])
                if (errors[err]) {
                    // console.log('Error input: ', err);
                    isError = true;
                    return false;
                }
            });
            // console.log("isError", isError);
            if (!isError) {
                setIsSaving(true)
                try {
                    const result = await axios.post(import.meta.env.VITE_API_URL + '/users/update', updated,
                        { headers: { "x-auth-token": userData.token } }
                    )

                    if (result.data.status) {
                        console.log('Update successful')

                        setTimeout(() => {
                            setIsSaving(false)
                        }, 500)

                        setSnackbar({
                            open: true,
                            severity: 'success',
                            message: 'User updated successfully'
                        })

                        fetchUser()
                    }
                    else {
                        console.log('Update failed ')
                        setSnackbar({
                            open: true,
                            severity: 'error',
                            message: 'User update failed'
                        })
                        setTimeout(() => {
                            setIsSaving(false)
                        }, 500)
                    }

                }
                catch (err) {
                    setTimeout(() => {
                        setIsSaving(false)
                    }, 500)
                    setSnackbar({
                        open: true,
                        severity: 'error',
                        message: 'User update failed'
                    })
                    console.log('Update failed: ' + err.message)
                }
            }
        }
    }

    return (
        <div className="gird-cols-1 mb-12 grid gap-7 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <Box sx={{ width: '80%' }}>
                <ul className="flex flex-col gap-4 p-0">
                    <li className="flex items-center justify-between gap-4 w-[100%]">
                        <Typography
                            variant="small"
                            color={fontColor}
                            className="font-semibold capitalize w-[60%]"
                        >
                            Username
                        </Typography>
                        <Input variant="outlined"
                            size="lg"
                            style={{ fontSize: '16px' }}
                            defaultValue={user?.name || ''}
                            error={errors?.name}
                            icon={errors?.name ? <Tooltip content="Username can only contain letters and numbers and must be less than 30 characters"><ErrorIcon /></Tooltip> : null}
                            onChange={(e) => {
                                if (/^[a-zA-Z][a-zA-Z0-9_]{0,29}$/.test(e.target.value)) {
                                    setErrors({ ...errors, name: false });
                                    setUpdated({ ...updated, name: e.target.value });
                                }
                                else {
                                    setErrors({ ...errors, name: true });
                                    setUpdated({ ...updated, name: user?.name });
                                }
                            }}
                            label="Username" />
                    </li>
                    <li className="flex items-center justify-between gap-4 w-[100%]">
                        <Typography
                            variant="small"
                            color={fontColor}
                            className="font-semibold capitalize w-[60%]"
                        >
                            First Name
                        </Typography>
                        <Input
                            variant="outlined"
                            size="lg"
                            style={{ fontSize: '16px' }}
                            defaultValue={user?.firstName || ''}
                            error={errors?.firstName}
                            icon={errors?.firstName ? <Tooltip content="Name can only contain letters, space, hyphen, or apostrophe"><ErrorIcon /></Tooltip> : null}
                            onChange={(e) => {
                                if (/^[A-Za-z]+([ '-][A-Za-z]+)*$/.test(e.target.value)) {
                                    setErrors({ ...errors, firstName: false });
                                    setUpdated({ ...updated, firstName: e.target.value });
                                }
                                else {
                                    setErrors({ ...errors, firstName: true });
                                    setUpdated({ ...updated, firstName: user?.firstName });
                                }
                            }}
                            label="First name"
                        />
                    </li>
                    <li className="flex items-center justify-between gap-4 w-[100%]">
                        <Typography
                            variant="small"
                            color={fontColor}
                            className="font-semibold capitalize w-[60%]"
                        >
                            last Name
                        </Typography>
                        <Input
                            variant="outlined"
                            size="lg"
                            style={{ fontSize: '16px' }}
                            defaultValue={user?.lastName || ''}
                            error={errors?.lastName}
                            icon={errors?.lastName ? <Tooltip content="Name can only contain letters, space, hyphen, or apostrophe"><ErrorIcon /></Tooltip> : null}
                            onChange={(e) => {
                                if (/^[A-Za-z]+([ '-][A-Za-z]+)*$/.test(e.target.value)) {
                                    setErrors({ ...errors, lastName: false });
                                    setUpdated({ ...updated, lastName: e.target.value });
                                }
                                else {
                                    setErrors({ ...errors, lastName: true });
                                    setUpdated({ ...updated, lastName: user?.lastName });
                                }
                            }}
                            label="Last name"
                        />
                    </li>
                    <li className="flex items-center justify-between gap-4 w-[100%]">
                        <Typography
                            variant="small"
                            color={fontColor}
                            className="font-semibold capitalize w-[60%]"
                        >
                            Email
                        </Typography>
                        <Input
                            variant="outlined"
                            size="lg"
                            style={{ fontSize: '16px' }}
                            defaultValue={user?.email || ''}
                            error={errors?.email}
                            icon={errors?.email ? <Tooltip content="Email can only contain numbers and alphabets!"><ErrorIcon /></Tooltip> : null}
                            onChange={(e) => {
                                if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)) {
                                    setErrors({ ...errors, email: false });
                                    // userInfo.email = e.target.value;
                                    setUpdated({ ...updated, email: e.target.value });
                                    // console.log('valid email', e.target.value);
                                    console.log(updated)
                                }
                                else {
                                    setErrors({ ...errors, email: true });
                                    userInfo.email = user?.email;
                                    setUpdated({ ...updated, email: user?.email });
                                }
                            }}
                            label="Email" />
                    </li>
                </ul>
            </Box>
            <Box sx={{ width: '80%' }}>
                <ul className="flex flex-col gap-4 p-0">
                    <li className="flex items-center justify-between gap-4 w-[100%]">
                        <Typography
                            variant="small"
                            color={fontColor}
                            className="font-semibold capitalize w-[60%]"
                        >
                            Phone
                        </Typography>
                        <Input
                            variant="outlined"
                            size="lg"
                            style={{ fontSize: '16px' }}
                            defaultValue={user?.phone || ''}
                            error={errors?.phone}
                            icon={errors?.phone ? <Tooltip content="Phone must start with +(country code)"><ErrorIcon /></Tooltip> : null}
                            onChange={(e) => {
                                if (/^\+(?:[0-9] ?){6,14}[0-9]$/.test(e.target.value)) {
                                    setErrors({ ...errors, phone: false });
                                    setUpdated({ ...updated, phone: e.target.value });
                                }
                                else {
                                    setErrors({ ...errors, phone: true });
                                    setUpdated({ ...updated, phone: user?.lastName });
                                }
                            }}
                            label="Phone" />
                    </li>
                    <li className="flex items-center justify-between gap-4 w-[100%]">
                        <Typography
                            variant="small"
                            color={fontColor}
                            className="font-semibold capitalize w-[60%]"
                        >
                            About
                        </Typography>
                        <Textarea
                            variant="outlined"
                            size="lg"
                            style={{ fontSize: '16px' }}
                            defaultValue={user?.about || ''}
                            error={errors?.about}
                            icon={errors?.about ? <Tooltip content="About can only have a maximum of 70 characters"><ErrorIcon /></Tooltip> : null}
                            onChange={(e) => {
                                if (/^.{0,70}$/.test(e.target.value)) {
                                    setErrors({ ...errors, about: false });
                                    setUpdated({ ...updated, about: e.target.value });
                                }
                                else {
                                    setErrors({ ...errors, about: true });
                                    setUpdated({ ...updated, about: user?.lastName });
                                }
                            }}
                            label="About" />
                    </li>
                    <li className="flex items-center justify-between gap-4 w-[100%]">
                        <Typography
                            variant="small"
                            color={fontColor}
                            className="font-semibold capitalize w-[60%]"
                        >
                            Country
                        </Typography>
                        {/* <Autocomplete options={countries} variant="outlined" value={userInfo?.location || ''} label="Name" /> */}
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={countryList}
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    // borderRadius: 4,
                                    '&:focus': {
                                        boxShadow: `${alpha('#3399EE', 0.25)} 0 0 0 0.2rem`,
                                        borderColor: '#3399EE',
                                    },
                                }
                            }}
                            // loading={isCountryListLoading}
                            defaultValue={user?.location || 'International'}

                            renderInput={(params) => <TextField
                                // onChange={() => updateLocation()}
                                inputRef={textRef}
                                {...params} label="Country" sx={{
                                    '& .MuiInputBase-input': {
                                        // borderRadius: 4,
                                        position: 'relative',
                                        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#1E1F26',
                                        // border: '1px solid #4b4d58',
                                        fontSize: 16,
                                        fontWeight: '400',
                                        width: '15rem',
                                        color: mode === 'dark' ? '#607d8b' : '#263238',
                                        padding: '10px 12px',
                                        transition: theme.transitions.create([
                                            'border-color',
                                            'background-color',
                                            'box-shadow',
                                        ]),
                                        // Use the system font instead of the default Roboto font.
                                        fontFamily: [
                                            '-apple-system',
                                            'BlinkMacSystemFont',
                                            '"Segoe UI"',
                                            'Roboto',
                                            '"Helvetica Neue"',
                                            'Arial',
                                            'sans-serif',
                                            '"Apple Color Emoji"',
                                            '"Segoe UI Emoji"',
                                            '"Segoe UI Symbol"',
                                        ].join(','),

                                    },

                                }}
                            />}
                        />
                    </li>
                    <li className="flex items-center justify-end gap-4 w-[100%]">
                        <LoadingButton

                            loading={isSaving}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            sx={{ backgroundColor: '#3399EE', width: "100px", height: "40px" }}
                            onClick={() => handleSave()}
                        >
                            Save
                        </LoadingButton>

                    </li>
                </ul>
            </Box>


            {/* Password update */}
            <Box sx={{ width: '80%' }}>

                <Box sx={{ mb: '1.5rem', display: passwordPopup ? 'none' : null }}>
                    <MaterialButton variant="gradient"
                        onClick={() => setPasswordPopup(true)}
                    >Change Password</MaterialButton >
                </Box>
                <Box sx={{ display: !passwordPopup ? 'none' : null }}>
                    <ul className="flex flex-col gap-4 p-0">
                        <li className="flex items-center justify-between gap-4 w-[100%]">
                            <Typography
                                variant="small"
                                color={fontColor}
                                className="font-semibold capitalize w-[60%]"
                            >
                                Current Password
                            </Typography>
                            <Input variant="outlined"
                                type="password"
                                onChange={(e) => {
                                    setPasswords({ ...passwords, current: e.target.value });
                                }}
                                label="Current Password" />
                        </li>
                        <li className="flex items-center justify-between gap-4 w-[100%]">
                            <Typography
                                variant="small"
                                color={fontColor}
                                className="font-semibold capitalize w-[60%]"
                            >
                                New Password
                            </Typography>
                            <Input
                                variant="outlined"
                                type="password"
                                error={passwordErrors?.new}
                                icon={passwordErrors?.new ? <Tooltip content="Invalid password format!"><ErrorIcon /></Tooltip> : null}
                                onChange={(e) => {
                                    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/.test(e.target.value)) {
                                        setPasswordErrors({ ...passwordErrors, new: false });
                                        setPasswords({ ...passwords, new: e.target.value });
                                    }
                                    else {
                                        setPasswordErrors({ ...passwordErrors, new: true });
                                    }
                                }}
                                label="New Password"
                            />
                        </li>
                        <li className="flex items-center justify-between gap-4 w-[100%]">
                            <Typography
                                variant="small"
                                color={fontColor}
                                className="font-semibold capitalize w-[60%]"
                            >
                                Confirm New password
                            </Typography>
                            <Input
                                variant="outlined"
                                type="password"
                                error={passwordErrors?.confirm}
                                icon={passwordErrors?.confirm ? <Tooltip content="New password and confirm password does not match!"><ErrorIcon /></Tooltip> : null}
                                onChange={(e) => {
                                    if (passwords.new === e.target.value) {
                                        setPasswordErrors({ ...passwordErrors, confirm: false });
                                        setPasswords({ ...passwords, confirm: e.target.value });
                                    }
                                    else {
                                        setPasswordErrors({ ...passwordErrors, confirm: true });
                                    }
                                }}
                                label="Confirm new password"
                            />
                        </li>
                        <li className="flex items-center justify-end gap-4 w-[100%]">
                            <LoadingButton

                                loading={isPasswordUpdating}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                                sx={{ backgroundColor: '#3399EE', width: "100px", height: "40px" }}
                                onClick={() => {
                                    if (passwords?.new && passwords?.current && passwords?.confirm && !passwordErrors?.new && !passwordErrors?.confirm) {
                                        setIsPasswordUpdating(true)
                                        authService.updatePassword(userData, passwords.current, passwords.new).then((response) => {
                                            console.log(response)
                                            if (response.status) setSnackbar({
                                                open: true,
                                                severity: 'success',
                                                message: 'Password Changed successfully'
                                            })
                                            else setSnackbar({
                                                open: true,
                                                severity: 'error',
                                                message: 'Password change failed!'
                                            })
                                            setIsPasswordUpdating(false)

                                        }).catch((error) => {
                                            console.log("🚀 ~ file: ProfileEdit.jsx:486 ~ authService.updatePassword ~ error:", error)
                                            setSnackbar({
                                                open: true,
                                                severity: 'error',
                                                message: error.message
                                            })
                                            setIsPasswordUpdating(false)

                                        })

                                    }
                                }}
                            >
                                Save
                            </LoadingButton>

                        </li>
                    </ul>
                </Box>
            </Box>
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

        </div >
    )
}

export default ProfileEdit