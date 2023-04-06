import React, { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ user, isSidebarOpen, setIsSideBarOpen }) => {


    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const mode = useSelector((state) => state.global.mode)
    // console.log(mode)

    return (
        <>
            {/* <Navbar isNonMobile={isNonMobile} /> */}
            {/* <Sidebar isNonMobile={isNonMobile} /> */}
            {/* <div className='relative'> */}
            <Sidebar isSidebarOpen={isSidebarOpen} isNonMobile={isNonMobile} mode={mode} />
            <Navbar isNonMobile={isNonMobile} mode={mode} user={user} isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen} />
            {/* </div> */}
        </>
    )
}

export default Layout