import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { LinearProgress, Tooltip } from '@mui/material';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import InfoIcon from '@mui/icons-material/Info';

const All = () => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { userData } = useAuth()
    const [error, setError] = useState(false)

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + '/administrative/transactions/all',
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
                ₹{(params.row.amount / 100).toLocaleString()}
            </div>
        )
    }

    const renderFee = (params) => {
        return (
            <div className="text-sm text-gray-600">
                (₹{(params.row.amount / 100).toLocaleString()})
            </div>
        )
    }
    const renderType = (params) => {
        return (
            <strong className='font-bold capitalize'>
                {params.row.type}
            </strong>
        )
    }

    const renderDescription = (params) => {
        return (
            <div className="text-sm text-gray-600">
                {params.row.description}
            </div>
        )
    }

    const renderClassification = (params) => {

        const type = params.row.cross_border_classification === 'export' ? 'International' : 'Country'

        return (
            <div className="bg-gray-400/30 pl-[5px] py-[2px] text-xs rounded-md text-slate-900 flex items-center">
                {type}
                <Tooltip title="Fund movement from service to be consumed outside India." sx={{ height: 20, opacity: .7, ml: .5 }} arrow>
                    <InfoIcon />
                </Tooltip>
            </div>
        )
    }
    const renderCurrency = (params) => {
        return (
            <div className="text-sm text-gray-800 uppercase ">
                {params.row.currency}
            </div>
        )
    }
    const renderHead = (title) => {
        return (
            <div className="font-bold">
                {title}
            </div>
        )
    }

    const renderCreated = (params) => {
        const timestamp = params.row.available_on; // timestamp in seconds

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
        const dateString = `${day} ${month}`;
        return (
            <div className="text-sm">
                {dateString}
            </div>
        )
    }

    const handleDownloadButton = () => {
        const headers = Object.keys(data[0]);

        // Transform each object into a string of comma-separated values
        const csv = [
            headers.join(','), // Header row
            ...data.map(obj => headers.map(key => {
                const value = obj[key];
                return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
            }).join(','))
        ].join('\n');

        const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        const link = document.createElement('a');
        link.setAttribute('href', csvContent);
        link.setAttribute('download', 'all-transactions.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }


    // Headers
    const columns = [
        {
            field: 'id', renderHeader: () => (
                <div className="font-bold">
                    ID
                </div>
            ), width: 70
        },
        {
            field: 'type', width: 130, renderCell: renderType, renderHeader: () => (
                <div className="font-bold">
                    TYPE
                </div>
            ),
        },
        {
            field: 'amount', renderHeader: () => (
                <div className="font-bold">
                    AMOUNT
                </div>
            ), width: 130, renderCell: renderAmount,
        },
        {
            field: 'fee', renderHeader: () => (
                <div className="font-bold">
                    FEE
                </div>
            ), width: 130, renderCell: renderFee
        },
        {
            field: 'currency', headerName: ' ', width: 130, renderCell: renderCurrency
        },
        {
            field: 'description', renderHeader: () => (
                <div className="font-bold">
                    DESCRIPTION
                </div>
            ), width: 250, renderCell: renderDescription
        },
        {
            field: 'cross_border_classification',
            headerName: ' ',
            type: 'string',
            width: 250,
            align: 'right',
            renderCell: renderClassification
        },
        {
            field: 'available_on',
            renderHeader: () => (
                <div className="font-bold">
                    AVAILABLE ON
                </div>
            ),
            sortable: false,
            width: 160,
            align: 'center',
            renderCell: renderCreated,

        },

    ];

    return (
        !isLoading ?
            <React.Fragment>
                {data.length > 0 ?
                    <div className='mt-5 '>
                        <div style={{ height: 700, width: '100%' }}>
                            <div className="flex justify-end mr-7">
                                <button onClick={handleDownloadButton} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
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
                                <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-700">No disputed test payments need a response</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Disputed test payments will appear here, and you can decide whether to respond with evidence or accept the dispute
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

export default All