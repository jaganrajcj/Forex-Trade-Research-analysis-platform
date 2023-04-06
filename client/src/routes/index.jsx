import React, { Suspense } from 'react'

const Home = React.lazy(() => import('@/pages/Home'))
const Register = React.lazy(() => import('@/pages/Home/register'))
const Login = React.lazy(() => import('@/pages/Home/login'))
const ForgotPass = React.lazy(() => import('@/pages/Home/forgotPass'))
const AuthPage = React.lazy(() => import('@/pages/auth'))
const UserDashboard = React.lazy(() => import('@/pages/User/index'))
const AdminLayout = React.lazy(() => import('@/pages/Admin/Layout'))
const Test = React.lazy(() => import('@/pages/Test'))
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));

const routes = [
    {
        path: "/",
        name: "Landing",
        component: <Home />
    },
    {
        path: "/signin",
        name: "SignIn",
        component: <Login />
    },
    {
        path: "/signup",
        name: "SignUp",
        component: <Register />
    },
    {
        path: "/forgot-password",
        name: "Forgot Password",
        component: <ForgotPass />
    },
    {
        path: "/auth",
        name: "Authentication",
        component: <AuthPage />
    },
    {
        path: "/dashboard",
        name: "UserDashboard",
        component: <UserDashboard />
    },
    {
        path: "/admin",
        name: "Admin Dashboard",
        component: <AdminLayout />
    },
    // Under testing
    {
        path: '/test',
        name: "Test page",
        component: <Test />
    },
    {
        path: '/testDashboard',
        name: "Test Dashboard",
        component: <Dashboard />
    }

]

export default routes

