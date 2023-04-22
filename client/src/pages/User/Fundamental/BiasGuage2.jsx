import useAuth from '@/hooks/useAuth';
import useGetTheme from '@/hooks/useGetTheme';
import useMode from '@/hooks/useMode';
import React from 'react'
import { TechnicalAnalysis, CopyrightStyles } from "react-ts-tradingview-widgets";


const BiasGuage2 = ({ selectedPair }) => {

    const theme = useGetTheme()
    const mode = useMode()
    const { userData } = useAuth()

    const styles = {
        parent: {
            fontSize: "24px",
            color: "red",
            display: 'none'
        },
        link: {
            textDecoration: "line-trough",
        },
        span: {
            color: "darkblue",
        },
    };

    return (
        <div className="h-[110%] relative overflow-hidden">
            <TechnicalAnalysis colorTheme={mode} width="100%" isTransparent={true} copyrightStyles={styles} symbol={`FOREXCOM:${selectedPair}`}></TechnicalAnalysis>
            <div className={`absolute ${mode == "light" ? 'bg-white' : 'bg-[#232231]'} right-0 bottom-7 w-64 h-7`}></div>
        </div >
    )
}

export default BiasGuage2