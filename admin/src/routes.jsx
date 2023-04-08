import React, { Suspense } from 'react'
import Analysis from './pages/Analysis';
import Sales from './pages/Sales';

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
        path: "/analysis",
        name: "Analysis",
        component: <Analysis />
    },
    {
        path: "/sales",
        name: "Sales",
        component: <Sales />
    },
    {
        path: "/dashboard/analytics",
        name: "Dashboard",
        component: <>Analytics...</>
    },

]

export default routes

