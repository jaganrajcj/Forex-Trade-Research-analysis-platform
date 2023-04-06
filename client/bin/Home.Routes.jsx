import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Home/login'
import Register from '@/pages/Home/register'

const HomeRoutes = () => {

    const routes = useRoutes([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/signin',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Register />
        }

    ])

    return routes
}

export default HomeRoutes