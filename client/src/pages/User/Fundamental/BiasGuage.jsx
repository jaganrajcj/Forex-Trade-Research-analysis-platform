import React, { useEffect, useRef, useState } from 'react'
// import * as JSC from "jscharting";
import useGetTheme from '@/hooks/useGetTheme';
import { Stack, styled, Typography } from '@mui/material';
import bgDark from '@/assets/bgDark.png'
import bgLight from '@/assets/bgLight.png'
import useMode from '@/hooks/useMode';
import FlexBetween from '@/components/FlexBetween';
import { Button } from "@material-tailwind/react";
import GaugeChart from 'react-gauge-chart'
import CloseIcon from '@mui/icons-material/Close';
import Slider, { SliderThumb } from '@mui/material/Slider';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

const BiasGuage = ({ selectedPair, setSnackbar }) => {

    const theme = useGetTheme()
    const mode = useMode()
    const { userData } = useAuth()
    const [gauge, setGauge] = useState('gauge')
    const [currentGauge, setCurrentGauge] = useState({
        intraDay: 50,
        swing: 50,
        positional: 50,
        longTerm: 50
    })
    const [currentGaugeAverages, setCurrentGaugeAverages] = useState({
        intraDayAvg: 0,
        swingAvg: 0,
        positionalAvg: 0,
        longTermAvg: 0
    })
    const [gaugeValues, setGaugeValues] = useState({})
    const [activeGauge, stActiveGauge] = useState('intraDay')
    const [gaugeValue, setGaugeValue] = useState(0)

    useEffect(() => {

    }, [])

    const intraDayRef = useRef()
    const swingRef = useRef()
    const positionalRef = useRef()
    const longTermRef = useRef()

    const baseCurrency = selectedPair.substring(0, 3).toLowerCase(); // get the first three characters as the base currency
    const quoteCurrency = selectedPair.substring(3, 6).toLowerCase(); // get the last three characters as the quote currency


    const chartStyle = {
        height: '100%',
        width: '100%',
        color: 'black'
    }
    const PrettoSlider = styled(Slider)({
        color: '#52af77',
        height: 8,
        '& .MuiSlider-track': {
            border: 'none',
            background: 'none',
        },
        '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
            },
            '&:before': {
                display: 'none',
            },
        },
        '& .MuiSlider-valueLabel': {
            lineHeight: 1.2,
            fontSize: 12,
            background: 'unset',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50% 50% 50% 0',
            backgroundColor: '#52af77',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&:before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },

        '& .MuiSlider-rail': {
            background: 'linear-gradient(to right, #22C55E, #EF4444)',
            opacity: 1,
        }
    });

    const getMyGauge = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + '/analysis/fundamental/gauge/mine',
                { headers: { "x-auth-token": userData.token } })

            if (res.data.status) {
                setCurrentGauge({
                    intraDay: res.data.intraDay,
                    swing: res.data.swing,
                    positional: res.data.positional,
                    longTerm: res.data.longTerm
                })
            }
        }
        catch (err) {
            console.log(err.response)
        }
    }

    const getGaugeAverages = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + '/analysis/fundamental/gauge/',
                { headers: { "x-auth-token": userData.token } })

            if (res.data.status) {
                setCurrentGaugeAverages({
                    intraDayAvg: res.data.intraDayAvg,
                    swingAvg: res.data.swingAvg,
                    positionalAvg: res.data.positionalAvg,
                    longTermAvg: res.data.longTermAvg
                })
                console.log(res.data)
            }
        }
        catch (err) {
            console.log(err.response)
        }
    }
    const handleSubmit = async () => {
        try {
            setCurrentGauge({
                intraDay: intraDayRef.current.outerText,
                swing: swingRef.current.outerText,
                positional: positionalRef.current.outerText,
                longTerm: longTermRef.current.outerText
            })
            const values = {
                intraDay: intraDayRef.current.outerText,
                swing: swingRef.current.outerText,
                positional: positionalRef.current.outerText,
                longTerm: longTermRef.current.outerText
            }

            const res = await axios.post(import.meta.env.VITE_API_URL + '/analysis/fundamental/gauge/update',
                values,
                { headers: { "x-auth-token": userData.token } })

            if (res.data.status) {
                getMyGauge()
                getGaugeAverages()
                setSnackbar({
                    open: true,
                    severity: 'success',
                    message: 'Vote added successfully'
                })
            }
        }
        catch (err) {
            console.log(err.response)
            setSnackbar({
                open: true,
                severity: 'error',
                message: 'Failed to add vote!'
            })
        }
    }



    useEffect(() => {
        getMyGauge()
        getGaugeAverages()
    }, [])

    return (
        <div className={` overflow-auto w-full`}>
            <Typography variant="h6" align="center" sx={{ color: theme.palette.secondary[200], fontSize: '14px' }}>Bias Gauge</Typography>

            {
                gauge === 'gauge' ?
                    <>
                        <FlexBetween sx={{ my: '20px' }}>
                            <Button variant="text">Intra Day</Button>
                            <Button variant="text">Swing</Button>
                            <Button variant="text">Positional</Button>
                            <Button variant="text">Long Term</Button>
                        </FlexBetween>

                        <div className="h-full relative">
                            <div className="absolute top-[35%] left-[50%] -translate-y-2/4 -translate-x-2/4">
                                <Typography variant="h5" align="center" sx={{ mt: '20px', color: theme.palette.secondary[100], fontSize: '25px', fontWeight: 'bold' }}>{1200}</Typography>
                                <Typography variant="h5" align="center" sx={{ ml: 1, color: theme.palette.secondary[200], fontSize: '14px', }}>Votes</Typography>

                            </div>
                            <GaugeChart id="gauge-chart1"
                                style={chartStyle}
                                textColor={theme.palette.secondary[200]}
                                percent={currentGaugeAverages.intraDayAvg / 100}
                                hideText
                            />
                            <Button variant="gradient" className='z-50 ml-4' onClick={() => setGauge('vote')}>Vote</Button>
                        </div>
                        <Typography variant="h6" align="center" sx={{ mt: '20px', color: theme.palette.secondary[200], fontSize: '14px', }}>A total of {120} people voted and {30}% of them are bullish biased and rest {70}% are bearish biased. </Typography>
                    </>
                    : <>
                        <div className="relative h-full w-full pt-6">
                            <CloseIcon className='absolute top-0 right-4 cursor-pointer' onClick={() => setGauge('gauge')} />

                            <Stack spacing={2} direction="row" sx={{ my: '30px', mx: '1' }} alignItems="center">
                                <Typography variant="h5" align="left" sx={{ ml: 1, color: theme.palette.secondary[200], fontSize: '16px', fonWeight: 'bold', width: '7rem' }}>Intra Day: </Typography>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                </svg>
                                <PrettoSlider
                                    ref={intraDayRef}
                                    sx={{ width: '250px' }}
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={currentGauge.intraDay}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                </svg>
                            </Stack>

                            <Stack spacing={2} direction="row" sx={{ my: '30px', mx: '1' }} alignItems="center">
                                <Typography variant="h5" align="left" sx={{ ml: 1, color: theme.palette.secondary[200], fontSize: '16px', fonWeight: 'bold', width: '7rem' }}>Swing Trading: </Typography>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                </svg>
                                <PrettoSlider
                                    ref={swingRef}
                                    sx={{ width: '250px' }}
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={currentGauge.swing}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                </svg>
                            </Stack>

                            <Stack spacing={2} direction="row" sx={{ my: '30px', mx: '1' }} alignItems="center">
                                <Typography variant="h5" align="left" sx={{ ml: 1, color: theme.palette.secondary[200], fontSize: '16px', fonWeight: 'bold', width: '7rem' }}>Positional: </Typography>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                </svg>
                                <PrettoSlider
                                    ref={positionalRef}
                                    sx={{ width: '250px' }}
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={currentGauge.positional}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                </svg>
                            </Stack>

                            <Stack spacing={2} direction="row" sx={{ my: '30px', mx: '1' }} alignItems="center">
                                <Typography variant="h5" align="left" sx={{ ml: 1, color: theme.palette.secondary[200], fontSize: '16px', fonWeight: 'bold', width: '7rem' }}>Long term: </Typography>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                </svg>
                                <PrettoSlider
                                    ref={longTermRef}
                                    sx={{ width: '250px' }}
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={currentGauge.longTerm}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                </svg>
                            </Stack>


                            <Button
                                variant="gradient"
                                onClick={() => handleSubmit()}
                            >
                                Add Vote
                            </Button>

                            <Typography variant="h6" align="left" sx={{ my: '20px', mx: '10px', color: theme.palette.secondary[200], fontSize: '14px', }}>Slide the thumb to indicate how bullish/bearish you are</Typography>
                        </div>
                    </>
            }

        </div >
    )
}

export default BiasGuage