import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from "@mui/material"
import useGetTheme from '@/hooks/useGetTheme'
import { ResponsiveLine } from '@nivo/line'
import { data } from './data'
import { useSelector } from 'react-redux'


const OverviewChart = ({ summary }) => {

    const theme = useGetTheme()
    const mode = useSelector((state) => state.global.mode)
    const [isLoading, setIsLoading] = useState(true)
    const [data2, setData] = useState([])

    useEffect(() => {
        try {

            if (summary) {

                let monthlyData = []
                let chartData = []
                // console.log("🚀 ~ file: OverViewChart.jsx:21 ~ useEffect ~ summary:", summary)

                if (true) {
                    for (let i = 1; i <= 12; i++) {
                        const trades = summary["trades"].filter(obj => new Date(obj.date).getMonth() === i - 1);

                        monthlyData.push({ month: i, trades })
                    }

                    monthlyData.forEach((data) => {
                        // console.log(data.month, data.trades)
                    })
                }
                let months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

                const getBalanceFromArray = (arr) => {
                    // console.log("Data array: ", arr)
                    let lastTrade = arr.trades[arr.trades.length - 1]
                    return lastTrade?.balance
                }

                monthlyData.forEach((data) => {
                    // console.log(data)
                    chartData.push({
                        "x": months[data.month - 1],
                        "y": getBalanceFromArray(data)
                    })
                })

                const getFirstDataValue = (arr) => {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].y != undefined) {
                            return arr[i].y
                        }
                    }
                }
                for (let i = 0; i < chartData.length; i++) {
                    if (chartData[i].x == 'jan' && chartData[i].y == undefined)
                        chartData[i].y = getFirstDataValue(chartData);
                    else {
                        if (chartData[i].y == undefined)
                            chartData[i].y = chartData[i - 1].y
                    }
                }

                setData([{
                    "id": 'Equity',
                    "color": "hsl(21, 70%, 50%)",
                    "data": chartData
                }])
                // console.log(chartData)
                // console.log(monthlyData)
            }
            setIsLoading(false)
        }
        catch (err) {
            console.log(err.message)
        }
    }, [summary])


    const nivoTheme = {
        "background": 'transparent',
        "textColor": theme.palette.secondary[100],
        "fontSize": 11,
        "axis": {
            "domain": {
                "line": {
                    "stroke": "#777777",
                    "strokeWidth": 1
                }
            },
            "legend": {
                "text": {
                    "fontSize": 12,
                    "fill": mode === "light" ? theme.palette.secondary[300] : theme.palette.secondary[600]
                }
            },
            "ticks": {
                "line": {
                    "stroke": "#777777",
                    "strokeWidth": 1
                },
                "text": {
                    "fontSize": 11,
                    "fill": theme.palette.secondary[100]
                }
            }
        },
        "grid": {
            "line": {
                "stroke": mode === 'light' ? theme.palette.secondary[400] : '#333',
                "strokeWidth": 1
            }
        },
        "legends": {
            "title": {
                "text": {
                    "fontSize": 11,
                    "fill": "#333333"
                }
            },
            "text": {
                "fontSize": 11,
                "fill": "#333333"
            },
            "ticks": {
                "line": {},
                "text": {
                    "fontSize": 10,
                    "fill": "#333333"
                }
            }
        },
        "annotations": {
            "text": {
                "fontSize": 13,
                "fill": "#333333",
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "link": {
                "stroke": "#000000",
                "strokeWidth": 1,
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "outline": {
                "stroke": "#000000",
                "strokeWidth": 2,
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            },
            "symbol": {
                "fill": "#000000",
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
            }
        },
        "tooltip": {
            "container": {
                "background": "#ffffff",
                "color": "#333333",
                "fontSize": 12
            },
            "basic": {},
            "chip": {},
            "table": {},
            "tableCell": {},
            "tableCellValue": {}
        }
    }

    return (
        !isLoading &&
        <ResponsiveLine
            data={data2 ? data2 : []}
            theme={nivoTheme}
            margin={{ top: 10, right: 10, bottom: 50, left: 45 }}
            xScale={{ type: 'point' }}
            colors={{ scheme: 'category10' }}
            curve="cardinal"
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Equity',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enablePoints={false}
            pointSize={10}
            pointColor='#32c8af'
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[]}
        />
    )
}

export default OverviewChart