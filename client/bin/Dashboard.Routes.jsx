import React from 'react'
import { useRoutes } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Journal from '@/pages/Dashboard/Journal'
import Layout from '@/pages/Dashboard/Layout'
import Analyze from '@/pages/Dashboard/Analyze'

const DashboardRoutes = () => {

    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: 'journal',
                    element: <Journal />
                },
                {
                    path: 'analyze',
                    element: <Analyze />,
                    children: [
                        {
                            path: ':id',
                            element: <Analyze />,
                        }
                    ]
                },

            ]
        },

    ])

    return routes
}

export default DashboardRoutes