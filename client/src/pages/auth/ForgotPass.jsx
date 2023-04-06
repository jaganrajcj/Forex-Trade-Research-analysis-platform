import React, { useEffect, useState } from 'react'
import logo from "@/assets/logoDark.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from "@material-tailwind/react";
import ErrorIcon from '@mui/icons-material/Error';
import { Alert, CircularProgress } from '@mui/material';
import { authService } from "@/services/authService"
import useAuth from '@/hooks/useAuth';
import jwt_decode from "jwt-decode";

const ForgotPass = () => {

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        message: ''
    })
    // const { token } = useParams()
    // console.log(token)
    const [message, setMessage] = useState({})
    const [data, setData] = useState({})
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { userData, setUserData } = useAuth()

    useEffect(() => {
        document.querySelectorAll('.otp-input').forEach((element) => {
            element.addEventListener('input', (e) => {
                let nextSibling = element.nextElementSibling;
                if (element.value)
                    if (nextSibling) nextSibling.focus()
            })
        })
    }, [])

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
                    <h2 className="text-gray-100 font-semibold text-5xl mt-4">Forgot password? <div className="w-[15px] h-[15px] bg-[#0284c7] inline-block rounded-full"></div></h2>

                    {errors.message && <Alert severity="error" sx={{ width: '60%', mt: '2rem', color: '#b91c1c', fontSize: '16px' }} variant="string">{errors?.message}</Alert>}

                    {message.message && <Alert severity="success" icon={false} sx={{ width: '60%', mt: '2rem', color: "#22c55e", fontSize: '16px' }} variant="string">
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

                    <h2 className={`${!isValidEmail ? 'hidden' : null} text-gray-400 font-light text-sm mt-7`}>Didn't receive code? <button className="text-[#0284c7]">Resend</button></h2>

                    <div className="lg:w-[60%] mt-5 rounded-2xl h-[4.2rem]flex items-center ">
                        <button
                            onClick={async () => {
                                if (data.email) {
                                    setErrors({})
                                    setIsLoading(true)
                                    const res = await authService.requestPasswordReset(data.email);
                                    console.log(res)
                                    if (res.data.status) {
                                        setErrors({})
                                        setMessage({ message: 'An email with password reset link is being sent to your email', severity: 'success' })
                                        setIsValidEmail(true)
                                        setIsLoading(false)
                                    }
                                    else {
                                        setErrors({ ...errors, message: res.data.message })
                                        setIsLoading(false)
                                    }
                                }

                            }}
                            className="w-[45%] h-[4rem] bg-blue-500 text-gray-50 shadow-lg shadow-blue-500/20 font-semibold text-lg leading-3 rounded-[4rem] flex items-center justify-center">

                            {isLoading &&
                                <CircularProgress size="20px" color="inherit" sx={{ mr: '.7rem', }} />
                            }

                            Get Link
                        </button>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ForgotPass