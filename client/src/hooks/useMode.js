import React from 'react'
import { useSelector } from 'react-redux'

const useMode = () => {
    return useSelector((state) => state.global.mode)
}

export default useMode