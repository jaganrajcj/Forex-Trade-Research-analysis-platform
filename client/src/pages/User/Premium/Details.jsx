import useAuth from '@/hooks/useAuth';
import useGetTheme from '@/hooks/useGetTheme';
import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Details = ({ setIsUserPremium }) => {

    const theme = useGetTheme()
    const { userData, setUserData } = useAuth()
    const [data, setData] = useState({})
    const [confirmationPopup, setConfirmationPopup] = useState(false)


    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + '/subscription/',
            { headers: { "x-auth-token": userData.token } }
        ).then((res) => {
            console.log("🚀 ~ file: Details.jsx:15 ~ ).then ~ res:", res.data)
            if (res.status === 200)
                setData(res.data)
        }).catch((err) => {
            console.log("Couldn't fetch user")
        })
    }, [])

    function convertMongoDate(dateString) {

        if (!dateString) return ''
        const date = new Date(dateString);
        const options = { month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <div className="container my-24 px-6 mx-auto">

            <section className="mb-32 text-gray-800">

                <div className="container mx-auto xl:px-32 text-center lg:text-left">
                    <div className="grid lg:grid-cols-2 items-center">
                        <div className="mb-12 lg:mb-0 ">
                            <div className="block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
                                style={{ background: theme.palette.mode === 'light' ? 'hsla(0, 0%, 100%, 0.55)' : 'hsla(245, 13%, 18%, 0.55)', 'backdrop-filter': 'blur(30px)' }}>
                                <h2 className={`text-3xl font-bold mb-4 pb-2 ${theme.palette.mode === 'dark' ? 'text-white' : null}`}>My plan</h2>

                                <div>
                                    <p className={`text-md  mb-4 pb-2 ${theme.palette.mode === 'dark' ? 'text-white' : null}`}><strong>Plan Type:</strong> <span className='text-gray-700'>{data?.plan?.toUpperCase() || ''}</span></p>
                                    <p className={`text-md  mb-4 pb-2 ${theme.palette.mode === 'dark' ? 'text-white' : null}`}><strong>Upgraded Date:</strong> <span className='text-gray-700'>{convertMongoDate(data?.updatedAt)}</span></p>
                                    <p className={`text-md  mb-4 pb-2 ${theme.palette.mode === 'dark' ? 'text-white' : null}`}><strong>Valid Until:</strong> <span className='text-gray-700'>{convertMongoDate(data?.validUntil)}</span></p>
                                    <button type="button"
                                        className="inline-block px-3 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
                                        data-mdb-ripple="true" data-mdb-ripple-color="light"
                                        onClick={() => { setConfirmationPopup(true) }}
                                    >
                                        Cancel Premium
                                    </button>

                                </div>

                                <Dialog
                                    open={confirmationPopup}
                                    onClose={() => setConfirmationPopup(false)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Confirm account deletion"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            You are about to cancel your subscription, this action cannot be undone,<br /> The refund(if any) process will be initiated within 2 working days.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => {
                                            setConfirmationPopup(false);

                                        }}>
                                            Exit</Button>
                                        <Button onClick={() => {

                                            axios.get(import.meta.env.VITE_API_URL + '/subscription/cancelSub',
                                                { headers: { "x-auth-token": userData.token } }
                                            ).then((res) => {
                                                console.log("🚀 ~ file: Details.jsx:87 ~ ).then ~ res:", res)
                                                // window.location.reload()
                                                setIsUserPremium(false)
                                                setConfirmationPopup(false)
                                            }).catch((error) => {
                                                console.log(error.response)
                                                setConfirmationPopup(false)

                                            })

                                        }} color="error" >
                                            Cancel
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                            </div>
                        </div>

                        <div>
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80" className="w-full rounded-lg shadow-lg h-full"
                                alt="" />
                        </div>
                    </div>
                </div>

            </section>

        </div>
    )
}

export default Details