import { Box, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { Suspense, useEffect, useState } from 'react'
import StatCard from "@/widgets/cards/StatCard"
import statisticsCardsData from "@/data/StatData"
import { journal } from '@/services/journal';
import useAuth from '@/hooks/useAuth';
import OverviewChart from './OverViewChart'
import PieChart from './PieChart'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,

} from "@material-tailwind/react";

// temp icons
import {
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";
import Header from '@/components/Header';
import useGetTheme from '@/hooks/useGetTheme';
import SummaryTable from './SummaryTable';
const ProfitPerPair = React.lazy(() => import('./ProfitPerPair'))
import ErrorBoundary from '@/components/ErrorBoundary';
import RiskOfRuin from './RiskOfRuin';

const Dashboard = () => {

    const [summary, setSummary] = useState({})
    const { userData } = useAuth()
    const theme = useGetTheme()
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")

    useEffect(() => {
        journal.getSummary(userData).then((result) => {
            // console.log(result.data)

            setSummary(result.data)

        }).catch((error) => {
            console.log(error)
        })
        console.log(theme)
    }, [])

    return (
        <Box
            sx={{ mt: '20px', mb: '20px' }}
        >
            <Header title="DASHBOARD" />
            <Box
                mt="30px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    // backgroundColor: theme.palette.ternary[100],
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" }
                }}>
                <Box
                    gridColumn="span 3"
                    gridRow="span 1"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <Card color="transparent" shadow={false} sx={{ width: '100%', height: '100%' }}>
                        <CardHeader
                            variant="gradient"
                            color={'green'}
                            className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </CardHeader>
                        <CardBody className="p-4 text-right">
                            <Typography variant="small" sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}>
                                Equity
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#22c55e' }}>
                                ${summary?.currentBalance || 0}
                            </Typography>
                        </CardBody>
                        <CardFooter className="p-4" color="red">
                            <Typography variant='body' sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}><strong className="text-green-500">+20%</strong> From last month</Typography>
                        </CardFooter>

                    </Card>
                </Box>
                <Box
                    gridColumn="span 3"
                    gridRow="span 1"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <Card color="transparent" shadow={false} sx={{ width: '100%', height: '100%' }}>
                        <CardHeader
                            variant="gradient"
                            color={'blue'}
                            className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                            </svg>

                        </CardHeader>
                        <CardBody className="p-4 text-right">
                            <Typography variant="small" sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}>
                                Total Trades
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#22c55e' }}>
                                {summary.totalTrades || 0}
                            </Typography>
                        </CardBody>
                        <CardFooter className="p-4" color="red">
                            <Typography variant='body' sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}><strong className="text-green-500">+15%</strong> From last month</Typography>
                        </CardFooter>

                    </Card>
                </Box>

                {/* Chart */}
                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem', px: '1rem', py: '1rem' }}
                >
                    <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                        <Typography variant="h6" align="center" sx={{ color: theme.palette.secondary[200], fontSize: '14px' }}>EQUITY CURVE</Typography>
                        <OverviewChart summary={summary} />
                    </ErrorBoundary>

                </Box>
                {/*  */}
                <Box
                    gridColumn="span 2"
                    gridRow="span 1"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem', mt: '.7rem' }}
                >
                    <Card color="transparent" shadow={false} sx={{ width: '100%', height: '100%' }}>
                        <CardHeader
                            variant="gradient"
                            color={'green'}
                            className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg>


                        </CardHeader>
                        <CardBody className="p-4 text-right">
                            <Typography variant="small" sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}>
                                Winning Trades
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#22c55e' }}>
                                {summary.winningTrades || 0}
                            </Typography>
                        </CardBody>
                        <CardFooter className="p-4" color="red">
                            <Typography variant='body' sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}><strong className="text-green-500">+15%</strong> From last month</Typography>
                        </CardFooter>

                    </Card>
                </Box>
                <Box
                    gridColumn="span 2"
                    gridRow="span 1"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem', mt: '.7rem' }}
                >
                    <Card color="transparent" shadow={false} sx={{ width: '100%', height: '100%' }}>
                        <CardHeader
                            variant="gradient"
                            color={'red'}
                            className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                            </svg>

                        </CardHeader>
                        <CardBody className="p-4 text-right">
                            <Typography variant="small" sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}>
                                Losing Trades
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#22c55e' }}>
                                {summary.LosingTrades || 0}
                            </Typography>
                        </CardBody>
                        <CardFooter className="p-4" color="red">
                            <Typography variant='body' sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}><strong className="text-green-500">+15%</strong> From last month</Typography>
                        </CardFooter>

                    </Card>
                </Box>

                <Box
                    gridColumn="span 2"
                    gridRow="span 1"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem', mt: '.7rem' }}
                >
                    <Card color="transparent" shadow={false} sx={{ width: '100%', height: '100%' }}>
                        <CardHeader
                            variant="gradient"
                            color={'orange'}
                            className="absolute -mt-4 grid h-16 w-16 place-items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>


                        </CardHeader>
                        <CardBody className="p-4 text-right">
                            <Typography variant="small" sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}>
                                Win Rate
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#22c55e' }}>
                                {parseFloat(summary?.winRate || 0).toFixed(1) || 0}%
                            </Typography>
                        </CardBody>
                        <CardFooter className="p-4" color="red">
                            <Typography variant='body' sx={{ color: theme.palette.secondary[100], fontSize: '15px' }}>Last month: <strong className="text-blue-500">54%</strong></Typography>
                        </CardFooter>

                    </Card>
                </Box>


                {/* Row 2 */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem', px: '1rem', py: '1rem' }}
                >
                    <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                        <Typography variant="h6" align="center" sx={{ color: theme.palette.secondary[200], fontSize: '14px' }}>MOST TRADED PAIRS</Typography>
                        <PieChart summary={summary} />
                    </ErrorBoundary>

                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <ErrorBoundary fallback={<Skeleton sx={{ borderRadius: '.7rem' }} variant="rounded" animation="wave" width="100%" height='100%' />}>
                        <Suspense fallback={<Skeleton sx={{ borderRadius: '.7rem' }} variant="rounded" animation="wave" width="100%" height='100%' />}>
                            <ProfitPerPair trades={summary.trades} />
                        </Suspense>
                    </ErrorBoundary>

                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem' }}
                >
                    <ErrorBoundary fallback={<Skeleton sx={{ borderRadius: '.7rem' }} variant="rounded" animation="wave" width="100%" height='100%' />}>
                        <Suspense fallback={<Skeleton sx={{ borderRadius: '.7rem' }} variant="rounded" animation="wave" width="100%" height='100%' />}>
                            <RiskOfRuin trades={summary.trades} />
                        </Suspense>
                    </ErrorBoundary>
                </Box>

                {/* Row 3 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 3"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem', px: '1rem', py: '1rem' }}
                >
                    <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                        <Typography variant="h6" align="center" sx={{ color: theme.palette.secondary[200], fontSize: '14px', mt: '.4rem' }}>JOURNAL SUMMARY</Typography>
                        <SummaryTable trades={summary.trades} />
                    </ErrorBoundary>

                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    color={theme.palette.secondary[100]}
                    backgroundColor={theme.palette.custom[100]}
                    sx={{ boxShadow: 3, borderRadius: '.7rem', px: '1rem', py: '1rem' }}
                >
                    <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                        Box 7
                    </ErrorBoundary>
                </Box>
            </Box >
        </Box >
    )
}

export default Dashboard