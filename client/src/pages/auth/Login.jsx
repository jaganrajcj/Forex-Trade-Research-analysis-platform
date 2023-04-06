import React, { useState } from 'react'
import logo from "@/assets/logoDark.png";
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from "@material-tailwind/react";
import ErrorIcon from '@mui/icons-material/Error';
import { Alert, CircularProgress } from '@mui/material';
import { authService } from "@/services/authService"
import useAuth from '@/hooks/useAuth';
import jwt_decode from "jwt-decode";

const Login = () => {

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
                    <h2 className="text-gray-700 font-semibold text-lg"><Link to="/auth/sign-up">Join</Link></h2>
                </div>
                <div className="auth-container border-0 p-5 flex flex-col mt-32 w-full lg:w-[50%] h-[100%]">
                    <h2 className="text-gray-400 font-bold text-xl">GET STARTED</h2>
                    <h2 className="text-gray-100 font-semibold text-5xl mt-4">One among Us? <div className="w-[15px] h-[15px] bg-[#0284c7] inline-block rounded-full"></div></h2>
                    <h2 className="text-gray-400 font-light text-lg mt-7">Don't have an account? <Link to="/auth/sign-up" className="text-[#0284c7]">Sign Up</Link></h2>

                    {errors.message && <Alert severity="error" sx={{ width: '60%', mt: '2rem', color: '#b91c1c', fontSize: '16px' }} variant="string">{errors?.message}</Alert>}

                    {message.message && <Alert severity="success" icon={false} sx={{ width: '60%', mt: '2rem', color: "#22c55e", fontSize: '16px' }} variant="string">
                        <CircularProgress size="15px" color="inherit" sx={{ mr: '.5rem', mb: '-4px' }} />
                        {message?.message}
                    </Alert>}

                    <div className={`relative lg:w-[60%] mt-5 bg-[#323644] rounded-2xl h-[4.2rem] px-5 py-2 flex items-center ${errors?.email ? 'border-2 border-red-700' : 'border-0'}`}>
                        {errors?.email ? <span className='absolute right-3 m-0 p-0'>
                            <Tooltip content="Email cannot be empty"><ErrorIcon style={{ color: '#b91c1c' }} fontSize="large" /></Tooltip>
                        </span> : null
                        }
                        <div className="relative w-full  h-11 my-2 pt-2">
                            <input
                                onChange={(e) => {
                                    setData({ ...data, email: e.target.value });
                                    if (!e.target.value) setErrors({ ...errors, email: true });
                                    else setErrors({ ...errors, email: false });
                                }}
                                className="peer w-full h-full bg-transparent text-[#f8fafc] text-xl font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-0 placeholder-shown:border-blue-gray-200 pt-4 pb-1.5 border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                            <label className="flex tex-sm w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[12px] peer-focus:text-[11px] peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-gray-500 peer-focus:text-blue-500">Email </label>
                        </div>
                    </div>
                    <div className={`relative lg:w-[60%] mt-5 bg-[#323644] rounded-2xl h-[4.2rem] px-5 py-2 flex items-center ${errors?.password ? 'border-2 border-red-700' : 'border-0'}`}>
                        {errors?.password ? <span className='absolute right-3 m-0 p-0'>
                            <Tooltip content="Password cannot be empty"><ErrorIcon style={{ color: '#b91c1c' }} fontSize="large" /></Tooltip>
                        </span> : null
                        }
                        <div className="relative w-full  h-11 my-2 pt-2">
                            <input
                                onChange={(e) => {
                                    setData({ ...data, password: e.target.value });
                                    if (!e.target.value) setErrors({ ...errors, password: true })
                                    else setErrors({ ...errors, password: false })
                                }}
                                type="password" className="peer w-full h-full bg-transparent text-[#f8fafc] text-xl font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-0 placeholder-shown:border-blue-gray-200 pt-4 pb-1.5 border-blue-gray-200 focus:border-blue-500" placeholder=" " />
                            <label className="flex tex-sm w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[12px] peer-focus:text-[11px] peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-blue-gray-500 peer-focus:text-blue-500">password </label>
                        </div>
                    </div>
                    <h2 className="text-gray-400 font-light text-sm mt-7">Forgot password? <Link to="forgot-password" className="text-[#0284c7]">Reset</Link></h2>

                    <div className="lg:w-[60%] mt-5 rounded-2xl h-[4.2rem]flex items-center ">
                        <button
                            onClick={async () => {
                                // setErrors({ ...errors, message: "Invalid email or password" })
                                if (data.email && data.password) {
                                    const res = await authService.SignIn(data.email, data.password)
                                    console.log(res)

                                    if (!res) {
                                        setErrors({ ...errors, message: "Something went wrong!" })
                                        return false
                                    }
                                    if (res.status === 200) {
                                        if (res.data.authorized) {
                                            setErrors({})
                                            setMessage({ message: 'Login successful', severity: 'success' })
                                            setUserData({
                                                id: res.data.id,
                                                token: res.data.token,
                                                type: res.data.type,
                                                plan: res.data.plan
                                            })
                                            localStorage.setItem("auth-token", res.data.token);

                                            const decoded = jwt_decode(res.data.token);

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
                                            }, 1000)
                                        }
                                        else {
                                            setErrors({ ...errors, message: "Invalid username or password" })
                                        }
                                    }
                                    else if (res.status === 403) {
                                        setErrors({ ...errors, message: "Invalid username or password" })
                                    }
                                    else setErrors({ ...errors, message: "Invalid username or password" })

                                } else setErrors({ ...errors, message: "Fill in all forms" })
                            }}
                            className="w-[45%] h-[4rem] bg-blue-500 text-gray-50 shadow-lg shadow-blue-500/20 font-semibold text-lg leading-3 rounded-[4rem]">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login