import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CircularLoader from '../../partials/CircularLoader'
import NotFound from '../../partials/NotFound'
import Report from './Chart'
import SalesPage from './Sales'

const routes = [
    {
        path: '/',
        element: <Navigate to="data" />
    },
    {
        path: '/data',
        element: <SalesPage />
    },
    {
        path: 'monthly',
        element: <SalesPage />
    },
    {
        path: 'report',
        element: <Report />
    },
    {
        path: 'history',
        element: <>Sales History</>
    },
    {
        path: '*',
        element: <NotFound />
    }
]

const Sales = () => {
    return (
        <Suspense fallback={<CircularLoader />}>
            <Routes>
                {
                    routes.map((route) => (
                        <Route path={route.path + '/*'} element={route.element} key={route.path} />
                    ))
                }
            </Routes>
        </Suspense>
    )
}

export default Sales