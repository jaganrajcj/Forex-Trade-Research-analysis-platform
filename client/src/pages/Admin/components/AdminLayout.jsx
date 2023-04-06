import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div>Layout
            <Outlet />
        </div>
    )
}

export default AdminLayout