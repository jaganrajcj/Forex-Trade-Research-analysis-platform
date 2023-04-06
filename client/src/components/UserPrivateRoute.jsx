import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import userContext from '@/context/userContext'
import { Navigate } from 'react-router-dom'

const UserPrivateRoute = ({ children }) => {

    const { userData } = useContext(userContext)
    // console.log(userData)

    if (userData.type == 3)
        return (
            children
        )
    else return (<Navigate to="/signin" />)

}

export default UserPrivateRoute