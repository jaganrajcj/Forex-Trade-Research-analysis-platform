
import { themeSettings } from '@/theme'
import { createTheme } from '@mui/material'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const useGetTheme = () => {

    const mode = useSelector((state) => state.global.mode)

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
    return theme
}

export default useGetTheme