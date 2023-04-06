import CircularLoad from '@/components/CircularLoad'
import Header from '@/components/Header'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { Suspense } from 'react'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import CreatePost from './CreatePost'
// import Post from './post'
const Post = React.lazy(() => import('./post'))
// import PostView from './PostView'
const PostView = React.lazy(() => import('./PostView'))

const Posts = () => {

    const [currentView, setCurrentView] = useState({
        view: 'posts',
        postId: null
    })

    const { pathname } = useLocation()

    return (
        <Box
            sx={{ mt: '20px', mb: '20px' }}
        >
            <Header title="USER POSTS" />
            <Suspense fallback={<CircularLoad />}>
                <Routes>
                    <Route path="/" element={<Post />} />
                    <Route path="view-post" element={<PostView />} />
                    <Route path="new-post" element={<CreatePost />} />
                </Routes>
            </Suspense>

        </Box>
    )
}

export default Posts