import useAuth from '@/hooks/useAuth';
import useGetTheme from '@/hooks/useGetTheme'
import { Alert, CircularProgress, Switch, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertBar from '@/components/Alertbar';

const Pricing = () => {

    const theme = useGetTheme()
    const [plan, setPlan] = useState('annual')
    const [loading, setLoading] = useState(false)
    const [alertBarInfo, setAlertBarInfo] = useState({
        open: false,
        message: '',
        severity: ''
    })
    const { userData } = useAuth()
    const navigate = useNavigate()

    const handleBuyClick = async () => {
        setLoading(true)
        axios.post(import.meta.env.VITE_API_URL + '/subscription/create-payment-intent',
            { id: plan === 'annual' ? 2 : 1 },
            { headers: { "x-auth-token": userData.token } }
        ).then((res) => {
            if (res.data.url) {
                setTimeout(() => {
                    setLoading(false)
                    window.location = res.data.url
                }, 1000)
            }
            else {
                setLoading(false)
                setAlertBarInfo({
                    open: true,
                    message: 'Payment initialization failed!',
                    severity: 'error'
                })
                setTimeout(() => {
                    setAlertBarInfo({
                        open: false,
                        message: '',
                        severity: ''
                    })
                }, [5000])
                console.log('Payment intent request failed')
            }
        }).catch((err) => {
            setTimeout(() => {
                setLoading(false)
                setAlertBarInfo({
                    open: true,
                    message: 'Payment initialization failed!',
                    severity: 'error'
                })
            }, 1000)
            setTimeout(() => {
                setAlertBarInfo({
                    open: false,
                    message: '',
                    severity: ''
                })
            }, [5000])
            console.log(err.response)
        })
    }

    return (
        <div className="container my-24 px-6 mx-auto">

            <section className="mb-32 text-gray-800">

                <div className="container mx-auto xl:px-32 text-center lg:text-left">
                    <div className="grid lg:grid-cols-2 items-center">
                        <div className="mb-12 lg:mb-0 ">
                            <div className="block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
                                style={{ background: theme.palette.mode === 'light' ? 'hsla(0, 0%, 100%, 0.55)' : 'hsla(245, 13%, 18%, 0.55)', 'backdrop-filter': 'blur(30px)' }}>
                                <h2 className={`text-3xl font-bold mb-4 pb-2 ${theme.palette.mode === 'dark' ? 'text-white' : null}`}>Upgrade to premium</h2>
                                <Stack direction="row" spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="p" color={theme.palette.secondary[300]} sx={{ fontSize: 15 }}>Monthly</Typography>
                                    <Switch
                                        sx={{ boxShadow: 0 }}
                                        checked={plan === 'annual' ? true : false}
                                        onChange={() => {
                                            if (plan === 'annual') setPlan('monthly');
                                            else setPlan('annual');
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Typography variant="p" color={theme.palette.secondary[300]} sx={{ fontSize: 15 }}>Annually</Typography>

                                </Stack>
                                <p className="text-gray-500 mb-6 mt-3 pb-2">
                                    There are no contracts or long-term commitments. You can cancel or change your plan at any time.
                                </p>
                                <div className="flex flex-wrap mb-4">
                                    <div className="w-full md:w-4/12 mb-4">
                                        <p className={`flex items-center justify-center lg:justify-start ${theme.palette.mode === 'dark' ? 'text-gray-300' : null}`}>
                                            <svg className="w-4 h-4 mr-2 text-blue-600" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512">
                                                <path fill="currentColor"
                                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                                                </path>
                                            </svg>Support 24/7
                                        </p>
                                    </div>
                                    <div className="w-full md:w-4/12 mb-4">
                                        <p className={`flex items-center justify-center lg:justify-start ${theme.palette.mode === 'dark' ? 'text-gray-300' : null}`}>
                                            <svg className="w-4 h-4 mr-2 text-blue-600" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512">
                                                <path fill="currentColor"
                                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                                                </path>
                                            </svg>Summary Reports
                                        </p>
                                    </div>
                                    <div className="w-full md:w-4/12 mb-4">
                                        <p className={`flex items-center justify-center lg:justify-start ${theme.palette.mode === 'dark' ? 'text-gray-300' : null}`}>
                                            <svg className="w-4 h-4 mr-2 text-blue-600" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512">
                                                <path fill="currentColor"
                                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                                                </path>
                                            </svg>Technical Analysis
                                        </p>
                                    </div>
                                    <div className="w-full md:w-4/12 mb-4">
                                        <p className={`flex items-center justify-center lg:justify-start ${theme.palette.mode === 'dark' ? 'text-gray-300' : null}`}>
                                            <svg className="w-4 h-4 mr-2 text-blue-600" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512">
                                                <path fill="currentColor"
                                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                                                </path>
                                            </svg>Journal insights
                                        </p>
                                    </div>
                                    <div className="w-full md:w-4/12 mb-4">
                                        <p className={`flex items-center justify-center lg:justify-start ${theme.palette.mode === 'dark' ? 'text-gray-300' : null}`}>
                                            <svg className="w-4 h-4 mr-2 text-blue-600" role="img" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512">
                                                <path fill="currentColor"
                                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
                                                </path>
                                            </svg>Become moderator
                                        </p>
                                    </div>

                                </div>

                                {loading && <Alert severity="success" icon={false} sx={{ width: '60%', color: "#22C55E", fontSize: '15px', ml: -2 }} variant="string">
                                    <CircularProgress size="14px" color="inherit" sx={{ mr: '.5rem', mb: '-3px' }} />
                                    <span className="leading-3 ">Initiating Payment...</span>
                                    {/* <Typography variant="p" sx={{ fontSize: 15, ml: 0 }}>Initializing payment</Typography> */}
                                </Alert>}

                                <button type="button"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
                                    data-mdb-ripple="true" data-mdb-ripple-color="light"
                                    onClick={handleBuyClick}
                                >
                                    Buy now
                                </button>
                                {
                                    plan === 'monthly' ?
                                        <Typography variant="p" color={theme.palette.secondary[200]} sx={{ fontSize: 15, ml: 3 }}><strong>${'5.00'}</strong>/month</Typography>
                                        : (plan === 'annual' ? <Typography variant="p" color={theme.palette.secondary[200]} sx={{ fontSize: 15, ml: 3 }}><strong className="line-through">${'60.00'}</strong> <strong >${'50.00'}</strong>/month</Typography> : null)
                                }
                            </div>
                        </div>

                        <div>
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80" className="w-full rounded-lg shadow-lg h-full"
                                alt="" />
                        </div>
                    </div>

                </div>

            </section>
            {alertBarInfo?.open && <AlertBar info={alertBarInfo} />}
        </div>
    )
}

export default Pricing