import React, { useEffect, useMemo, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { useSelector } from 'react-redux'
import useGetTheme from '@/hooks/useGetTheme'

const data = [
    {
        "id": "ruby",
        "label": "ruby",
        "value": 378,
        "color": "hsl(245, 70%, 50%)"
    },
    {
        "id": "make",
        "label": "make",
        "value": 149,
        "color": "hsl(127, 70%, 50%)"
    },
    {
        "id": "hack",
        "label": "hack",
        "value": 87,
        "color": "hsl(299, 70%, 50%)"
    },
    {
        "id": "haskell",
        "label": "haskell",
        "value": 327,
        "color": "hsl(298, 70%, 50%)"
    },
    {
        "id": "php",
        "label": "php",
        "value": 185,
        "color": "hsl(221, 70%, 50%)"
    }
]

const PieChart = ({ summary }) => {

    const theme = useGetTheme()
    const mode = useSelector((state) => state.global.mode)

    const [data2, setData] = useState([])


    useMemo(() => {

        function getRandomHSLColor() {
            // Randomly generate hue, saturation, and lightness values
            var hue = Math.floor(Math.random() * 360);
            var saturation = Math.floor(Math.random() * 100);
            var lightness = Math.floor(Math.random() * 100);

            // Return HSL color string
            return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
        }

        try {
            // console.log("Summary: ", summary)
            const arrKeys = Object.keys(summary?.tradeCount)
            const arrValues = Object.values(summary?.tradeCount)

            // console.log(arrKeys, arrValues)

            if (arrKeys?.length && arrValues?.length) {
                // console.log('HEEEEEE', Object.keys(summary.tradeCount).length)
                let tempArr = []
                for (let i = 0; i < Object.keys(summary.tradeCount).length; i++) {
                    // console.log('New: ', { id: arrKeys[i], label: arrKeys[i], value: arrValues[i], color: getRandomHSLColor() })
                    tempArr.push({ id: arrKeys[i], label: arrKeys[i], value: arrValues[i], color: getRandomHSLColor() })
                }
                // console.log(tempArr)
                setData(tempArr)
            }
        }
        catch (err) {
            console.log(err.message)
        }

    }, [summary])

    // useEffect(() => {
    //     // console.log(data2)
    //     console.log("🚀 ~ file: PieChart.jsx:70 ~ useEffect ~ data2:", data2)
    // }, [data2])

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
        <ResponsivePie
            data={data2 ? data2 : []}
            margin={{ top: 20, right: 10, bottom: 50, left: -50 }}
            padding={{ bottom: 40 }}
            innerRadius={0.5}
            padAngle={0.7}
            theme={nivoTheme}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            arcLinkLabelsTextColor={theme.palette.secondary[100]}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 30,
                    translateY: 0,
                    itemsSpacing: 5,
                    itemWidth: 100,
                    itemHeight: 25,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default PieChart