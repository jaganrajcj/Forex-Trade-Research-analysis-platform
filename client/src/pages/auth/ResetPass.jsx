import React, { useEffect, useState } from 'react'
import logo from "@/assets/logoDark.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from "@material-tailwind/react";
import ErrorIcon from '@mui/icons-material/Error';
import { Alert, CircularProgress } from '@mui/material';
import { authService } from "@/services/authService"
import useAuth from '@/hooks/useAuth';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const ResetPass = () => {
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        message: ''
    })
    const { token } = useParams()

    const [message, setMessage] = useState({})
    const [data, setData] = useState({})
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const [circularLoading, setCircularLoading] = useState(false)
    const { userData, setUserData } = useAuth()

    // useEffect(() => {
    //     document.querySelectorAll('.otp-input').forEach((element) => {
    //         element.addEventListener('input', (e) => {
    //             let nextSibling = element.nextElementSibling;
    //             if (element.value)
    //                 if (nextSibling) nextSibling.focus()
    //         })
    //     })
    // }, [])

    const checkTokenValidity = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + `/users/forgot-password/is-token-valid/${token}`)
            console.log(res)

            if (res.data.status) setIsLoading(false)
            else navigate('/auth')
        }
        catch (err) {
            console.log('Error! invalid token')
            navigate('/auth')
        }

    }

    useEffect(() => {
        if (!token) navigate('/auth')
        checkTokenValidity()

    }, [])

    return (
        !isLoading ?
            < div className="auth-page-container" >
                <div className='content-container px-[2rem] lg:px-[5rem] py-[2rem] lg:py-[4rem] h-[100%]'>
                    <div className="auth-navbar flex flex-row justify-between lg:justify-start sm:justify-between gap-10 lg:gap-[8rem]  items-center">
                        <img src={logo} alt="" width="144px" height="40px" />
                        <h3 className="text-gray-700 font-semibold text-lg"><Link to="/">Home</Link></h3>
                        <h2 className="text-gray-700 font-semibold text-lg"><Link to="/auth/sign-up">Join</Link></h2>
                    </div>
                    <div className="auth-container border-0 p-5 flex flex-col mt-32 w-full lg:w-[50%] h-[100%]">
                        <h2 className="text-gray-400 font-bold text-xl">GET STARTED</h2>
                        <h2 className="text-gray-100 font-semibold text-5xl mt-4">Reset password <div className="w-[15px] h-[15px] bg-[#0284c7] inline-block rounded-full"></div></h2>

                        {errors.message && <Alert severity="error" sx={{ width: '60%', mt: '2rem', color: '#b91c1c', fontSize: '16px' }} variant="string">{errors?.message}</Alert>}

                        {message.message && <Alert severity="success" icon={false} sx={{ width: '60%', mt: '2rem', color: "#22c55e", fontSize: '16px' }} variant="string">
                            <CircularProgress size="15px" color="inherit" sx={{ mr: '.5rem', mb: '-4px' }} />
                            {message?.message}
                        </Alert>}

                        <div className={`relative lg:w-[60%] mt-5 bg-[#323644] rounded-2xl h-[4.2rem] px-5 py-2 flex items-center ${errors?.password ? 'border-2 border-red-700' : 'border-0'}`}>
                            {errors?.password ? <span className='absolute right-3 m-0 p-0'>
                                <Tooltip content="Password must contain at least one uppercase, lowercase, number and special characters!"><ErrorIcon style={{ color: '#b91c1c' }} fontSize="large" /></Tooltip>
                            </span> : null
                            }
                            <div className="relative w-full  h-11 my-2 pt-2">
                                <input
                                    type="password"
                                    onChange={(e) => {
                                        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/.test(e.target.value)) {
                                            setData({ ...data, password: e.target.value });
                                            setErrors({ ...errors, password: false })
                                        }
                                        else setErrors({ ...errors, password: true })
                                    }}
                                    className="peer w-full h-full bg-transparent text-[#f8fafc] text-xl font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-0 placeholder-shown:border-blue-gray-200 pt-4 pb-1.5 border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                                <label className="flex tex-sm w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[12px] peer-focus:text-[11px] peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-gray-500 peer-focus:text-blue-500">Password </label>
                            </div>
                        </div>

                        <div className={`relative lg:w-[60%] mt-5 bg-[#323644] rounded-2xl h-[4.2rem] px-5 py-2 flex items-center ${errors?.confirmPass ? 'border-2 border-red-700' : 'border-0'}`}>
                            {errors?.confirmPass ? <span className='absolute right-3 m-0 p-0'>
                                <Tooltip content="Passwords doesn't match!"><ErrorIcon style={{ color: '#b91c1c' }} fontSize="large" /></Tooltip>
                            </span> : null
                            }
                            <div className="relative w-full  h-11 my-2 pt-2">
                                <input
                                    type="password"
                                    onChange={(e) => {
                                        if (e.target.value === data.password) {
                                            setData({ ...data, confirmPass: e.target.value });
                                            setErrors({ ...errors, confirmPass: false });
                                        }
                                        else {
                                            setErrors({ ...errors, confirmPass: true });
                                        }
                                    }}

                                    className="peer w-full h-full bg-transparent text-[#f8fafc] text-xl font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-0 placeholder-shown:border-blue-gray-200 pt-4 pb-1.5 border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                                <label className="flex tex-sm w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[12px] peer-focus:text-[11px] peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-gray-500 peer-focus:text-blue-500">Confirm Password </label>
                            </div>
                        </div>

                        <div className="lg:w-[60%] mt-5 rounded-2xl h-[4.2rem]flex items-center ">
                            <button
                                onClick={async () => {
                                    setCircularLoading(true)

                                    if (data.password && data.confirmPass && !errors.password && !errors.confirmPass) {

                                        const res = await authService.resetPassword(data, token)

                                        const delay = ms => new Promise(res => setTimeout(res, ms));

                                        if (res.data.status) {
                                            setErrors({})
                                            setMessage({ message: 'Password updated successfully, redirecting...', severity: 'success' })
                                            setCircularLoading(false)
                                            await delay(2000);
                                            navigate('/auth')
                                        }
                                        else {
                                            setErrors({ message: res.data.message })
                                            setCircularLoading(false)
                                        }
                                    }
                                    else
                                        setErrors({ ...errors, message: "Fill in all fields!" })
                                }}
                                className="w-[45%] h-[4rem] bg-blue-500 text-gray-50 shadow-lg shadow-blue-500/20 font-semibold text-lg leading-3 rounded-[4rem]">
                                {circularLoading &&
                                    <CircularProgress size="20px" color="inherit" sx={{ mr: '.7rem', }} />
                                }
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div >
            : null
    )
}

export default ResetPass