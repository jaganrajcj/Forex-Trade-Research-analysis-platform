import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import CircularLoader from '../../partials/CircularLoader'
import NotFound from '../../partials/NotFound';
import Admins from './Admins';
import UserPosts from './UserPosts';

const UsersPage = React.lazy(() => import('./Users'));
const ProUsers = React.lazy(() => import('./ProUsers'));

const routes = [
    {
        path: '/',
        element: <UsersPage />
    },
    {
        path: 'users',
        element: <UsersPage />
    },
    {
        path: 'pro-users',
        element: <ProUsers />
    },
    {
        path: 'admins',
        element: <Admins />
    },
    {
        path: 'posts',
        element: <UserPosts />
    },
    {
        path: '*',
        element: <NotFound />
    }
]

const Users = () => {
    return (
        <Suspense fallback={<CircularLoader />}>
            <Routes>
                {
                    routes.map((route) => (
                        <Route path={route.path} element={route.element} key={route.path} />
                    ))
                }
            </Routes>
        </Suspense>
    )
}

export default Users