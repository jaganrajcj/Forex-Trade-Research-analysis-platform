import useGetTheme from '@/hooks/useGetTheme';
import { Typography } from '@mui/material';
import React from 'react'

const Details = () => {

    const theme = useGetTheme()

    return (
        <div className="container my-24 px-6 mx-auto">

            <section className="mb-32 text-gray-800">

                <div className="container mx-auto xl:px-32 text-center lg:text-left">
                    <div className="grid lg:grid-cols-2 items-center">
                        <div className="mb-12 lg:mb-0 ">
                            <div className="block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14"
                                style={{ background: theme.palette.mode === 'light' ? 'hsla(0, 0%, 100%, 0.55)' : 'hsla(245, 13%, 18%, 0.55)', 'backdrop-filter': 'blur(30px)' }}>
                                <h2 className={`text-3xl font-bold mb-4 pb-2 ${theme.palette.mode === 'dark' ? 'text-white' : null}`}>My plan</h2>

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