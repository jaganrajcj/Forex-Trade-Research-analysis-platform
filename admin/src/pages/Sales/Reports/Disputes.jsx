import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { LinearProgress } from '@mui/material';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';


const Disputes = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { userData } = useAuth()
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + '/administrative/transactions/disputes',
            { headers: { "x-auth-token": userData.token } }
        ).then((res) => {

            setData(res.data)
            setTimeout(() => { setIsLoading(false) }, 700)

        }).catch((error) => {

        })
    }, [])

    const renderStatus = (params) => {
        return (
            <div className={`${params.row.status === 'succeeded' ? 'bg-green-400' : 'bg-red-400'} p-1 rounded-lg font-semibold text-xs`}>
                {params.row.status}
            </div>
        )
    }

    const renderAmount = (params) => {
        return (
            <div className="text-sm">
                ${(params.row.amount / 100).toLocaleString()}
            </div>
        )
    }

    const renderCreated = (params) => {
        const timestamp = params.row.created; // timestamp in seconds

        // create a new Date object using the timestamp
        const date = new Date(timestamp * 1000);

        // extract the day, month and year values from the Date object
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const year = date.getFullYear();

        // extract the hour and minute values from the Date object
        const hour = date.getHours();
        const minute = date.getMinutes();

        // format the date string using the extracted values
        const dateString = `${day} ${month}, ${hour}:${minute}`;
        return (
            <div className="text-sm">
                {dateString}
            </div>
        )
    }


    // Headers
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'amount', headerName: 'AMOUNT', width: 130, renderCell: renderAmount, },
        { field: 'status', headerName: 'STATUS', width: 130, renderCell: renderStatus, },
        { field: 'name', headerName: 'NAME', width: 130 },
        { field: 'email', headerName: 'CUSTOMER', width: 250 },
        {
            field: 'payment_intent',
            headerName: 'DESCRIPTION',
            type: 'string',
            width: 250,
            align: 'left'
        },
        {
            field: 'created',
            headerName: 'CREATED',
            sortable: false,
            width: 160,
            renderCell: renderCreated,

        },
        {
            field: 'payment_method',
            headerName: 'PAYMENT METHOD',
            type: 'number',
            width: 150,
            align: 'center'
        },
    ];

    return (
        !isLoading ?
            <React.Fragment>
                {data.count > 0 ?
                    <div className='mt-5 '>
                        <div style={{ height: 700, width: '100%' }}>
                            <div className="flex justify-end mr-7">
                                <button onClick={() => { }} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                    <span>Download</span>
                                </button>
                            </div>
                            <DataGrid
                                rows={data}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                rowsPerPage={10}
                                checkboxSelection={false}
                                sx={{
                                    mx: 3,
                                    textAlign: 'center',
                                    border: 0,
                                    fontSize: '13px',
                                    fontWeight: 'light'
                                }}

                            />
                        </div>
                    </div >
                    : <div className='mt-14 ml-10'>
                        <div class="max-w-sm p-6border rounded-lg  ">
                            <svg aria-hidden="true" className="text-gray-700 mb-4" height="24" width="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill-rule="evenodd"></path></svg>
                            <a href="#">
                                <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-700">No disputed payments need a response</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Disputed payments will appear here, and you can decide whether to respond with evidence or accept the dispute.
                            </p>

                        </div>

                    </div>
                }
            </React.Fragment >
            : <Box sx={{ width: '100%', mt: '20px' }}>
                <LinearProgress />
            </Box>
    )
}

export default Disputes