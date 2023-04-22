import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import jwt_decode from "jwt-decode";


const Login = () => {

    const mode = 'dark'
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const { setUserData } = useAuth()
    const [error, setError] = useState({
        status: false,
        message: ''
    })

    const handleSubmit = () => {
        try {
            axios.post(import.meta.env.VITE_API_URL + '/users/login', {
                email,
                password
            }).then((response) => {
                console.log(response);

                if (response.data.authorized) {

                    console.log('Authorized')

                    localStorage.setItem('auth-token', response.data.token)

                    setUserData({
                        id: response.data.id,
                        token: response.data.token,
                        type: response.data.type,
                        plan: response.data.plan
                    })

                    const decoded = jwt_decode(response.data.token);

                    console.log("decoded" + decoded)
                    if (decoded.user.type == 2400) {
                        console.log('Admin')
                        navigate('/dashboard')
                    }
                    else {
                        console.log('Not an admin')

                        setError({
                            status: true,
                            message: "Invalid username or password"
                        })
                    }
                }
                else {
                    console.log('Unauthorized')
                    setError({
                        status: true,
                        message: "Invalid username or password"
                    })
                }

            }).catch((error) => {
                console.log(error);
                setError({
                    status: true,
                    message: "Invalid username or password"
                })
            })
        }
        catch (error) {
            console.log(error)
            setError({
                status: true,
                message: error.message
            })
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 -pt-5">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <h2 className={`${mode === 'dark' ? 'text-gray-200' : 'text-gray-800'} font-semibold text-3xl mt-1`}><strong className="text-[#379CF0]">Fx </strong>Edge <div className="w-[15px] h-[15px] bg-[#379CF0] inline-block rounded-full"></div></h2>
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        {error.status && <p className='text-red-500'>{error.message}</p>}
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@domain.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                            </div>
                            <div className="flex justify-center space-x-2">
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    className="bg-blue-500 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                                    Login
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login