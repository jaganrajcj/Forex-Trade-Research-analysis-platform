import useGetTheme from '@/hooks/useGetTheme'
import { Button, Input, Option, Select, Textarea } from '@material-tailwind/react'
import { Alert, Box, LinearProgress, TextField, Typography, Snackbar } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import useAuth from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
const GetPairIcon = ({ countries }) => {

    const [currency1, currency2] = countries.split('/');
    const countryCode1 = currency1.slice(0, 2);
    const countryCode2 = currency2.slice(0, 2);

    return (
        <div className='relative w-5 h-5'>
            <img src={`https://s3-symbol-logo.tradingview.com/country/${countryCode2}.svg`} className="rounded-full w-[90%] h-[90%] border-white absolute -top-1 -right-1" />
            <img src={`https://s3-symbol-logo.tradingview.com/country/${countryCode1}.svg`} className="rounded-full w-full border border-white h-full absolute -bottom-[1px] -left-0" />

        </div>
    )
}

const markets = ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "USD/CAD", "AUD/USD", "NZD/USD", "EUR/GBP", "EUR/AUD", "GBP/JPY", "CHF/JPY", "NZD/JPY", "GBP/CAD"]


// Component start from here
const CreatePost = () => {

    const [uploadProgress, setUploadProgress] = useState(0);
    const [postData, setPostData] = useState({})
    const [filename, setFilename] = useState('')
    const theme = useGetTheme()
    const { userData } = useAuth()
    const navigate = useNavigate()

    const onDrop = useCallback((acceptedFiles, { xhr }) => {
        // Do something with the files

        const formData = new FormData();
        formData.append('file', acceptedFiles[0])

        const config = {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
            },
        };
        axios.post(import.meta.env.VITE_API_URL + '/posts/new-post/image', formData, config).then((response) => {
            // console.log(response.data.fileName);
            setFilename(response.data.fileName)
        });

        console.log(acceptedFiles)
        console.log(xhr)
        if (xhr) {
            xhr.upload.addEventListener('progress', (event) => {
                const percentCompleted = Math.round((event.loaded * 100) / event.total);
                setUploadProgress(percentCompleted);
            }, false);
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        console.log(uploadProgress)
    }, [uploadProgress])

    const handleSubmit = () => {
        if (!postData.title || !postData.description || !postData.market || !postData.bias || !filename)
            setSnackbar({
                open: true,
                message: 'Please fill all the fields',
                severity: 'error',
            })
        else {
            axios.post(import.meta.env.VITE_API_URL + '/posts/new-post',
                { ...postData, fileName: filename },
                { headers: { "x-auth-token": userData.token } })
                .then((response) => {
                    if (response.data.status) setSnackbar({
                        open: true,
                        message: response.data.message,
                        severity: 'success',
                    })
                    setTimeout(() => {
                        navigate('/dashboard/posts/')
                    }, 2000)

                })
                .catch((err) => {
                    setSnackbar({
                        open: true,
                        message: err.response.data.error,
                        severity: 'error',
                    })
                })
        }
    }

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: 'success',
        message: ''
    })
    const handleSnackbarClose = () => {
        setSnackbar({
            open: false
        })
    }

    return (
        <div className='w-full h-full mt-3 flex flex-col gap-7'>
            <Typography variant='h5'>Create New Post</Typography>
            <div>
                <Typography variant='h6' color={theme.palette.secondary[200]} sx={{ fontWeight: 400, fontSize: '18px' }}>Post Title</Typography>
                <Input
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    size="lg" label="Post Title" className={`${theme.palette.mode === 'dark' ? 'text-white' : 'text-black'}`} />
            </div>
            {/* <Menu>
                <MenuHandler>
                    <Button variant="gradient" className="flex flex-row w-48">Select Market
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-3 w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>

                    </Button>
                </MenuHandler>
                <MenuList className={`ml-0 ${theme.palette.mode == "dark" ? 'bg-[#232231]' : 'bg-[#f3f6fd]'} border-0 shadow-lg`}>
                    {markets.map((element, index) => (
                        <MenuItem onClick={() => setPostData({ ...postData, market: element })} key={index} className="flex flex-row gap-2"><GetPairIcon countries={element} />{element}</MenuItem>
                    ))}
                   
                </MenuList>
            </Menu> */}
            <div className="w-48">
                <Select label="Select Market" onChange={(e) => setPostData({ ...postData, market: e })}>
                    {
                        markets.map((element, index) => (
                            <Option value={element} key={index}>{element}</Option>
                        ))
                    }

                </Select>
            </div>
            <div className="w-48">
                <Select label="Select Bias" onChange={(e) => setPostData({ ...postData, bias: e })}>
                    <Option value="Bullish">Bullish</Option>
                    <Option value="Bearish">Bearish</Option>
                    <Option value="Neutral">Neutral</Option>
                </Select>
            </div>
            <div>
                <Typography variant='h6' color={theme.palette.secondary[200]} sx={{ fontWeight: 400, fontSize: '18px' }}>Post Description</Typography>
                <Textarea
                    onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                    size="lg" label="Textarea Large" className={`h-[100px] ${theme.palette.mode === 'dark' ? 'text-white' : 'text-black'} `} />
            </div>
            {/* <Typography variant='h6' color={theme.palette.secondary[200]} sx={{ fontWeight: 400, fontSize: '18px' }}x>Image</Typography> */}
            <div {...getRootProps()} className="w-full h-20 border-[1px] border-dashed border-gray-400 rounded-[5px] flex justify-center items-center gap-2">
                <input {...getInputProps()} className="w-full h-full" />
                <svg xmlns="http://www.w3.org/2000/svg" color={theme.palette.secondary[200]} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <Typography color={theme.palette.secondary[200]}>
                    Drop you image here
                </Typography>
            </div>

            {uploadProgress > 0 && <LinearProgressWithLabel value={uploadProgress} />}
            <Button variant="gradient" className='w-32' onClick={handleSubmit}>Post</Button>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ width: "400px", mt: '70px' }}
                open={snackbar?.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar?.severity || 'success'} sx={{ width: '80%', backgroundColor: 'white', color: snackbar?.severity == 'success' ? 'green' : 'red' }}>
                    <Typography variant="small" sx={{ fontWeight: 200 }}>{snackbar?.message}</Typography>
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CreatePost