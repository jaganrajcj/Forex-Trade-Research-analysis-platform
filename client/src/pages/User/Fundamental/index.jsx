import Header from '@/components/Header'
import useGetTheme from '@/hooks/useGetTheme';
import useMode from '@/hooks/useMode';
import { Input } from '@material-tailwind/react';
import { Alert, Autocomplete, Box, Snackbar, TextField, Typography, useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import React, { useEffect, useMemo, useState } from 'react'
import { AdvancedRealTimeChart, TickerTape } from "react-ts-tradingview-widgets";
import { countries } from './data';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import COT from './COT';
import ErrorBoundary from '@/components/ErrorBoundary';
import Technical from './Technical';
import InterestRates from './InterestRates';
import BiasGuage from './BiasGuage';
import Chart from './Chart';

const Fundamental = () => {

    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")
    const mode = useMode()
    const theme = useGetTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [selectedPair, setSelectedPair] = useState(getCurrentSelection())
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
    useEffect(() => {
        console.log(selectedPair)
    }, [selectedPair])

    function getCurrentSelection() {
        // console.log(params)
        console.log("🚀 ~ file: index.jsx:50 ~ getCurrentSelection ~ params:", params)
        // const urlParts = params['*'].split('/')
        // if (!urlParts[1]) return 'EURUSD'
        // else return urlParts[1]

        if (params['market']) return params['market']
        else return 'EURUSD'
    }
    useEffect(() => {
        // const urlParts = params['*'].split('/')
        // if (!urlParts[1]) setSelectedPair('EURUSD')
        // else return setSelectedPair(urlParts[1])
        if (params['market']) setSelectedPair(params['market'])
        else setSelectedPair('EURUSD')
    }, [params])

    useMemo(() => {
        console.log("Fetching analysis from server for " + selectedPair)
    }, [selectedPair])


    const styles = {
        parent: {
            fontSize: "24px",
            color: "red",
            display: 'none',
            opacity: 0
        },
        link: {
            textDecoration: "line-trough",
        },
        span: {
            color: "darkblue",
        },
    };

    const markets = ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "USD/CAD", "AUD/USD", "NZD/USD", "EUR/GBP", "EUR/AUD", "GBP/JPY", "CHF/JPY", "NZD/JPY", "GBP/CAD"]

    const symbols = [
        {
            "proName": "FOREXCOM:EURUSD",
            "title": "EURUSD"
        },
        {
            "proName": "FOREXCOM:GBPUSD",
            "title": "GBPUSD"
        },
        {
            "proName": "FOREXCOM:USDJPY",
            "title": "USDJPY"
        },
        {
            "proName": "FOREXCOM:USDCHF",
            "title": "USDCHF"
        },
        {
            "proName": "FOREXCOM:USDCAD",
            "title": "USDCAD"
        },
        {
            "proName": "FOREXCOM:AUDUSD",
            "title": "AUDUSD"
        },
        {
            "proName": "FOREXCOM:NZDUSD",
            "title": "NZDUSD"
        },
        {
            "proName": "FOREXCOM:EURGBP",
            "title": "EURGBP"
        },
        {
            "proName": "FOREXCOM:EURAUD",
            "title": "EURAUD"
        },
        {
            "proName": "FOREXCOM:GBPJPY",
            "title": "GBPJPY"
        },
        {
            "proName": "FOREXCOM:CHFJPY",
            "title": "CHFJPY"
        },
        {
            "proName": "FOREXCOM:NZDJPY",
            "title": "NZDJPY"
        },
        {
            "proName": "FOREXCOM:GBPCAD",
            "title": "GBPCAD"
        },
    ]

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

    const navigator = (element) => {
        // const urlParts = params['*'].split('/')
        // if (urlParts.length > 1) navigate(`../${urlParts[0]}/${element.replace('/', '')}`)
        // else
        //     navigate(`${element.replace('/', '')}`)
        navigate(`/dashboard/fundamental/${element.replace('/', '')}`)
    }

    return (
        <Box
            sx={{ mt: '20px', mb: '20px' }}
        >
            <Header title="FUNDAMENTALS" />
            <div className="mb-3 mt-4 flex flex-row gap-3 w-full max-h-10">
                <Menu>
                    <MenuHandler>
                        <Button variant="gradient" className="flex flex-row">Select Market
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-3 w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </Button>
                    </MenuHandler>
                    <MenuList className={`ml-0 ${theme.palette.mode == "dark" ? 'bg-[#232231]' : 'bg-[#f3f6fd]'} border-0 shadow-lg`}>
                        {markets.map((element, index) => (
                            <MenuItem onClick={() => navigator(element)} key={index} className="flex flex-row gap-2"><GetPairIcon countries={element} />{element}</MenuItem>
                        ))}
                        {/* <MenuItem>Menu Item 1</MenuItem>
                        <MenuItem>Menu Item 2</MenuItem>
                        <MenuItem>Menu Item 3</MenuItem> */}
                    </MenuList>
                </Menu>

                <div className="flex-grow -mt-1 max-h-10">
                    <TickerTape symbols={symbols} colorTheme={mode} isTransparent={true} copyrightStyles={styles} largeChartUrl="http://localhost:5173/dashboard/fundamental"></TickerTape>
                </div>

            </div>
            {/* Main container */}
            <Box
                mt="30px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="220px"
                gap="20px"
                sx={{
                    // backgroundColor: theme.palette.ternary[600],
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" }
                }}>
                {/* Price, */}

                <Box
                    gridColumn="span 8"
                    gridRow="span 1"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                        <COT selectedPair={selectedPair} />
                    </ErrorBoundary>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 1"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                        <InterestRates selectedPair={selectedPair} />
                    </ErrorBoundary>
                </Box>
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    color={theme.palette.secondary[100]}
                    backgroundColor='white'
                    sx={{ boxShadow: 3, borderRadius: '.7rem', p: '1rem', }}
                >
                    <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                        <Chart selectedPair={selectedPair} />

                    </ErrorBoundary>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem', p: '1rem', }}
                >
                    <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                        <BiasGuage selectedPair={selectedPair} setSnackbar={setSnackbar} />
                    </ErrorBoundary>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem', p: '1rem', }}
                >
                    <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>

                    </ErrorBoundary>
                </Box>
            </Box>

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
        </Box >
    )
}

export default Fundamental