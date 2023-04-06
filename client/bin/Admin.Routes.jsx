import React from 'react'
import { useRoutes } from 'react-router-dom'
import Layout from '@/pages/Admin/components/AdminLayout'
import AdminDashBoard from '@/pages/Admin/Dashboard'

const AdminRoutes = () => {

    const routes = useRoutes([
        {
            path: '/admin',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <AdminDashBoard />
                },
                {
                    path: '*',
                    element: <h3>Not Found</h3>,
                }
            ]
        },

    ])

    return routes;
}

export default AdminRoutes