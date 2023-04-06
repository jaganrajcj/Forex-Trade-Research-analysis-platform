import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Users from "./Users"
import Logout from "@/components/Logout"

const routes = [
    {
        path: "/",
        component: <h1>Index...</h1>,
    },
    {
        path: "journal",
        component: <h1>Journal...</h1>,
    },
    {
        path: "users",
        component: <Users />
    },
    {
        path: "logout",
        component: <Logout />
    }
]

const Admin = () => {
    return (
        <Layout>
            <h2>Is it working?</h2>
        </Layout>
    )
}

export default Admin