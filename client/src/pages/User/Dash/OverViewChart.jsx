import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from "@mui/material"
import useGetTheme from '@/hooks/useGetTheme'
import { ResponsiveLine } from '@nivo/line'
import { data } from './data'
import { useSelector } from 'react-redux'
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";


function getBalancesByMonth(trades) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const result = new Array(12).fill(0);
    let lastNonZeroBalance = null;

    for (let i = 11; i >= 0; i--) {
        const month = currentDate.getMonth() - i;
        const year = currentDate.getFullYear();

        let monthBalances = trades
            .filter(trade => new Date(trade.date).getMonth() === month && new Date(trade.date).getFullYear() === year)
            .map(trade => trade.balance);

        if (monthBalances.length === 0) {
            if (lastNonZeroBalance !== null) {
                result[i] = lastNonZeroBalance;
            }
        } else {
            let lastBalance = monthBalances[monthBalances.length - 1];
            if (lastBalance !== 0) {
                lastNonZeroBalance = lastBalance;
            }
            result[i] = lastBalance;
        }
    }

    return result.reverse();
}

const OverviewChart = ({ summary }) => {

    const theme = useGetTheme()
    const mode = useSelector((state) => state.global.mode)
    const [isLoading, setIsLoading] = useState(false)
    const [data2, setData] = useState([])

    useEffect(() => {
        // console.log(summary)
        if (summary?.trades?.length > 0) {
            console.log('chartData', getBalancesByMonth(summary.trades))
            setData(getBalancesByMonth(summary.trades))
        }
    }, [summary])

    function getLast12MonthsShort() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date();
        const result = [];

        for (let i = 11; i >= 0; i--) {
            const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            result.push(months[d.getMonth()]);
        }

        return result;
    }

    const labels = getLast12MonthsShort()

    const data = {
        labels: labels,
        datasets: [
            {
                label: null,
                backgroundColor: "rgb(50,152,238)",
                borderColor: "rgb(50,152,238)",

                data: data2
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'rgb(50,152,238)'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: theme.palette.secondary[200]
                },
                grid: {
                    color: mode === 'light' ? 'rgba(82, 82, 91, 0.2)' : 'rgba(100, 116, 139, 0.2)'
                }

            },
            y: {
                ticks: {
                    color: theme.palette.secondary[200]
                },
                grid: {
                    color: mode === 'light' ? 'rgba(82, 82, 91, 0.2)' : 'rgba(100, 116, 139, 0.2)'
                }
            }
        }
    }

    return (
        !isLoading &&
        <div className="h-full w-full pb-3 relative px-0 m-0">
            <Line data={data} options={options} width="100%" height="100%" />
        </div>
    )
}

export default OverviewChart