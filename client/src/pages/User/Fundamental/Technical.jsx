import useGetTheme from '@/hooks/useGetTheme';
import React, { useEffect } from 'react'
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";

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

const Technical = () => {

    useEffect(() => {

        document.querySelectorAll('.label-w6JJhLCp .label-wAvQLR3C .end-w6JJhLCp .bottom-w6JJhLCp .snap-w6JJhLCp .js-copyright-label').forEach((element) => {
            element.style.display = 'none'
        })
        setTimeout(() => {
            console.log(document.querySelectorAll('span'))
        }, 1000)

    }, [])

    const theme = useGetTheme()

    return (
        <div className="rounded-lg ">
            <TechnicalAnalysis className="border-0" colorTheme={theme.palette.mode} width="100%" copyrightStyles={styles}></TechnicalAnalysis>
        </div >
    )
}

export default Technical