import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../partials/Layout'
import routes from '../routes'

const DashboardPages = () => {
    return (
        <div>
            <Layout>
                <Suspense>
                    <Routes>
                        {routes.map((route) => (
                            <Route key={route.path} path={route.path + '/*'} element={route.component} />
                        ))}
                    </Routes>
                </Suspense>
            </Layout>
        </div>
    )
}

export default DashboardPages