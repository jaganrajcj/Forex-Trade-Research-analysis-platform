import React, { useState } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import useAuth from '@/hooks/useAuth';
import axios from 'axios'
import AlertBar from '@/partials/AlertBar';

const COTUpdate = () => {

    const { userData } = useAuth()
    const [selectedFile, setSelectedFile] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        severity: 'success',
        message: ''
    })
    // const formData = new FormData();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);

        // formData.append('cotFile', event.target.files[0]);

        // console.log("File added.", formData)
    }

    const handleSubmit = async () => {

        const formData = new FormData();
        formData.append("cotFile", selectedFile);

        axios.post(import.meta.env.VITE_API_URL + '/analysis/fundamental/cot/update',
            formData,
            {
                headers: {
                    "x-auth-token": userData.token,
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then((res) => {
            if (res.data.status) {
                setAlert({
                    open: true,
                    severity: 'success',
                    message: 'COT Data updated successfully'
                })

            }
            else {
                setAlert({
                    open: true,
                    severity: 'error',
                    message: 'COT Data update failed!'
                })
            }
        }).catch((err) => {
            console.log("Error", err.response)
            setAlert({
                open: true,
                severity: 'error',
                message: 'COT Data update failed!'
            })
        })
    }


    return (
        <Box sx={{ mx: '1.2rem', mt: '.8rem', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}>
            {alert?.open && <AlertBar alert={alert} setAlert={setAlert} />}
            <div className="flex flex-row justify-between mx-1 my-0">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">Commitment of Traders</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </div>
            <div className="text-xs font-semibold text-slate-400 uppercase mb-1 mx-1">Last Updated: <i><strong className='text-slate-500'>28/03/2023</strong></i></div>
            <div className="flex flex-row justify-between mx-1 my-1 h-10 gap-2">
                <input class="block text-sm flex-1 text-gray-800 border bg-[#EFEFEF] rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none p-1 dark:placeholder-gray-400" id="file_input" type="file" onChange={handleFileChange} />

                <button type="button" class="flex items-center justify-center text-gray-900 h-10 border bg-[#EFEFEF] focus:outline-none focus:ring-2  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:bg-gray-200" onClick={handleSubmit}>Update</button>

            </div>
        </Box>
    )
}

export default COTUpdate