import React, { Suspense } from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Users = React.lazy(() => import('./pages/Users'));

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: <Dashboard />
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: <Dashboard />
    },
    {
        path: "/users",
        name: "Users",
        component: <Users />
    },
    {
        path: "/dashboard/analytics",
        name: "Dashboard",
        component: <>Analytics...</>
    },
]

export default routes

