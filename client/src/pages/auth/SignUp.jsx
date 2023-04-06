import React, { useState } from 'react'
import logo from "@/assets/logoDark.png";
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from "@material-tailwind/react";
import ErrorIcon from '@mui/icons-material/Error';
import { Alert, CircularProgress } from '@mui/material';
import { authService } from "@/services/authService"
import useAuth from '@/hooks/useAuth';
import jwt_decode from "jwt-decode";

const SignUp = () => {

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        message: ''
    })
    const [message, setMessage] = useState({})
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const { userData, setUserData } = useAuth()

    return (
        <div className="auth-page-container">
            <div className='content-container px-[2rem] lg:px-[5rem] py-[2rem] lg:py-[4rem] h-[100%]'>
                <div className="auth-navbar flex flex-row justify-between lg:justify-start sm:justify-between gap-10 lg:gap-[8rem]  items-center">
                    <img src={logo} alt="" width="144px" height="40px" />
                    <h3 className="text-gray-700 font-semibold text-lg"><Link to="/">Home</Link></h3>
                    <h2 className="text-gray-700 font-semibold text-lg"><Link to="/auth/sign-in">Login</Link></h2>
                </div>
                <div className="auth-container border-0 p-5 flex flex-col mt-32 w-full lg:w-[50%] h-[75%]">
                    <h2 className="text-gray-400 font-bold text-xl">GET STARTED</h2>
                    <h2 className="text-gray-100 font-semibold text-5xl mt-4">Create new account <div className="w-[15px] h-[15px] bg-[#0284c7] inline-block rounded-full"></div></h2>
                    <h2 className="text-gray-400 font-light text-lg mt-7">Already have an account? <Link to="/auth/sign-in" className="text-[#0284c7]">Sign In</Link></h2>

                    {errors.message && <Alert severity="error" sx={{ width: '60%', mt: '2rem', color: '#b91c1c', fontSize: '16px' }} variant="string">{errors?.message}</Alert>}

                    {message.message && <Alert severity="success" icon={false} sx={{ width: '60%', mt: '2rem', color: "#22c55e", fontSize: '16px' }} variant="string">
                        <CircularProgress size="15px" color="inherit" sx={{ mr: '.5rem', mb: '-4px' }} />
                        {message?.message}
                    </Alert>}

                    <div className="flex flex-row mt-4 gap-3 border-0 w-full lg:w-[60%]">
                        <div className={`relative w-[50%] bg-[#323644] rounded-2xl h-[4.2rem] px-5 py-2 flex items-center ${errors?.firstName ? 'border-2 border-red-700' : 'border-0'}`}>
                            {errors?.firstName ? <span className='absolute right-3 m-0 p-0'>
                                <Tooltip content="Name can only have alphabets, and must be at least 2 characters"><ErrorIcon style={{ color: '#b91c1c' }} fontSize="medium" /></Tooltip>
                            </span> : null
                            }
                            <div className={`relative w-full  h-11 my-2 pt-2 $`}>
                                <input
                                    onChange={(e) => {
                                        if (/^[A-Za-z]+([ '-][A-Za-z]+)*$/.test(e.target.value)) {
                                            setData({ ...data, firstName: e.target.value });
                                            setErrors({ ...errors, firstName: false })
                                        }
                                        else setErrors({ ...errors, firstName: true })
                                    }}
                                    className="peer w-full h-full bg-transparent text-[#f8fafc] text-xl font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-0 placeholder-shown:border-blue-gray-200 pt-4 pb-1.5 border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                                <label className="flex tex-sm w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[12px] peer-focus:text-[11px] peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-gray-500 peer-focus:text-blue-500">First Name </label>
                            </div>
                        </div>
                        <div className={`relative w-[50%] bg-[#323644] rounded-2xl h-[4.2rem] px-5 py-2 flex items-center ${errors?.lastName ? 'border-2 border-red-700' : 'border-0'}`}>
                            {errors?.lastName ? <span className='absolute right-3 m-0 p-0'>
                                <Tooltip content="Name can only have alphabets, and must be at least 2 characters"><ErrorIcon style={{ color: '#b91c1c' }} fontSize="medium" /></Tooltip>
                            </span> : null
                            }
                            <div className="relative w-full  h-11 my-2 pt-2">
                                <input
                                    onChange={(e) => {
                                        if (/^[A-Za-z]+([ '-][A-Za-z]+)*$/.test(e.target.value)) {
                                            setData({ ...data, lastName: e.target.value });
                                            setErrors({ ...errors, lastName: false })
                                        }
                                        else setErrors({ ...errors, lastName: true })
                                    }}
                                    className="peer w-full h-full bg-transparent text-[#f8fafc] text-xl font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-0 placeholder-shown:border-blue-gray-200 pt-4 pb-1.5 border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                                <label className="flex tex-sm w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[12px] peer-focus:text-[11px] peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-gray-500 peer-focus:text-blue-500">Last Name </label>
                            </div>
                        </div>
                    </div>
                    <div className={`lg:w-[60%] mt-5 bg-[#323644] rounded-2xl h-[4.2rem] px-5 py-2 flex items-center ${errors?.userName ? 'border-2 border-red-700' : 'border-0'}`}>
                        <div className="relative w-full  h-11 my-2 pt-2">
                            {errors?.userName ? <span className='absolute right-3 m-0 p-0'>
                                <Tooltip content="Username can only have alphabets, and must be at least 2 characters"><ErrorIcon style={{ color: '#b91c1c' }} fontSize="medium" /></Tooltip>
                            </span> : null
                            }
                            <input
                                onChange={(e) => {
                                    if (/^[a-zA-Z][a-zA-Z0-9_]{0,29}$/.test(e.target.value)) {
                                        setData({ ...data, userName: e.target.value });
                                        setErrors({ ...errors, userName: false })
                                    }
                                    else setErrors({ ...errors, userName: true })
                                }}
                                className="peer w-full h-full bg-transparent text-[#f8fafc] text-xl font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-0 placeholder-shown:border-blue-gray-200 pt-4 pb-1.5 border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                            <label className="flex tex-sm w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[12px] peer-focus:text-[11px] peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-gray-500 peer-focus:text-blue-500">Username </label>
                        </div>
                    </div>
                    <div className={`lg:w-[60%] mt-5 bg-[#323644] rounded-2xl h-[4.2rem] px-5 py-2 flex items-center ${errors?.email ? 'border-2 border-red-700' : 'border-0'}`}>
                        <div className="relative w-full  h-11 my-2 pt-2">
                            {errors?.email ? <span className='absolute right-3 m-0 p-0'>
                                <Tooltip content="Email can only have alphabets, and must be at least 2 characters"><ErrorIcon style={{ color: '#b91c1c' }} fontSize="medium" /></Tooltip>
                            </span> : null
                            }
                            <input
                                onChange={(e) => {
                                    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e.target.value)) {
                                        setData({ ...data, email: e.target.value });
                                        setErrors({ ...errors, email: false })
                                    }
                                    else setErrors({ ...errors, email: true })
                                }}
                                autoComplete="off"
                                className="peer w-full h-full bg-transparent text-[#f8fafc] text-xl font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-0 placeholder-shown:border-blue-gray-200 pt-4 pb-1.5 border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                            <label className="flex tex-sm w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[12px] peer-focus:text-[11px] peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-gray-500 peer-focus:text-blue-500">Email </label>
                        </div>
                    </div>
                    <div className={`lg:w-[60%] mt-5 bg-[#323644] rounded-2xl h-[4.2rem] px-5 py-2 flex items-center ${errors?.password ? 'border-2 border-red-700' : 'border-0'}`}>
                        <div className="relative w-full  h-11 my-2 pt-2">
                            {errors?.password ? <span className='absolute right-3 m-0 p-0'>
                                <Tooltip content="Password must contain atl least one lower and upper case letters, number and a special character"><ErrorIcon style={{ color: '#b91c1c' }} fontSize="medium" /></Tooltip>
                            </span> : null
                            }
                            <input
                                onChange={(e) => {
                                    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/.test(e.target.value)) {
                                        setData({ ...data, password: e.target.value });
                                        setErrors({ ...errors, password: false })
                                    }
                                    else setErrors({ ...errors, password: true })
                                }}
                                autoComplete="new-password"
                                type="password" className="peer w-full h-full bg-transparent text-[#f8fafc] text-xl font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-0 placeholder-shown:border-blue-gray-200 pt-4 pb-1.5 border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                            <label className="flex tex-sm w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[12px] peer-focus:text-[11px] peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-gray-500 peer-focus:text-blue-500">password </label>
                        </div>
                    </div>
                    <div className="lg:w-[60%] mt-5 rounded-2xl h-[4.2rem]flex items-center ">
                        <button
                            onClick={async () => {
                                if (data.firstName && data.lastName && data.userName && data.email && data.password) {
                                    if (!errors.firstName && !errors.lastName && !errors.userName && !errors.email && !errors.password) {
                                        const res = await authService.SignUp(data)

                                        const delay = ms => new Promise(res => setTimeout(res, ms));

                                        if (res.data.status) {
                                            setErrors({})
                                            setMessage({ message: 'Signup successful, Redirecting', severity: 'success' })
                                            await delay(2000);
                                            navigate('/auth')
                                        }
                                        else {
                                            setErrors({ ...errors, message: res.data.message })
                                        }
                                    }
                                }
                                else
                                    setErrors({ ...errors, message: "Fill in all forms" })

                            }}
                            className="w-[45%] h-[4rem] bg-blue-500 text-gray-50 shadow-lg shadow-blue-500/20 font-semibold text-lg leading-3 rounded-[4rem]">Create Account</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignUp