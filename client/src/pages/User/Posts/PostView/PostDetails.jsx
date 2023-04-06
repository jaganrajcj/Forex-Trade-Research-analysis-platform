import useGetTheme from '@/hooks/useGetTheme'
import { Box, Chip, Typography, Avatar } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

const PostDetails = ({ post }) => {

    const navigate = useNavigate()
    const theme = useGetTheme()
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paramValue = params.get("id");
    // const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { userData } = useAuth()

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + `/posts/view-post?id=${paramValue}`,
            { headers: { "x-auth-token": userData.token } }
        )
            .then((response) => {
                console.log(response.data);
                if (response.data.post) setPost(response.data.post)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }, [])

    console.log(paramValue)

    return (

        <div className={``}>
            <div className={`h-14 sticky top-0 backdrop-blur-sm z-50 flex items-center pl-4`}>
                <Chip color="primary"
                    sx={{ cursor: 'pointer', top: 1, left: 1 }}
                    label="Posts"
                    onClick={() => navigate('../')}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    }
                />
            </div>
            <div className={`relative top-2 mx-3 p-3`}>
                <Typography variant="h5" color={theme.palette.secondary[100]} sx={{ pb: 1, mb: 2, borderBottom: 1, borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400] }}>{post?.title || ' '}</Typography>
                <div className="flex fle-row gap-2 mb-4">
                    <Chip color={post.bias === 'Bullish' ? 'success' : (post.bias === 'Bearish' ? 'error' : 'default')} size="small" icon={
                        post.bias === 'Bullish' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                            </svg>
                    } label={post.bias || ' '} />

                    <Chip color="info" size="small" label={post?.market || ''} />
                </div>
                <Typography
                    variant="p"
                    color={theme.palette.secondary[200]}
                    sx={{ fontWeight: 350, fontSize: '15px', mb: 3 }}
                >
                    {post?.description || ' '}
                </Typography>
                <Box
                    component="img"
                    src={`http://localhost:5001/trade-images/${post.imageSource}`}
                    sx={{ width: '100%', height: '330px', mt: 3 }}
                >

                </Box>

                <Box sx={{ py: 1, px: 0, mt: 2, display: 'flex', flexDirection: 'row', gap: '10px', borderBottom: 1, borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400] }}>
                    <ThumbUpIcon style={{ color: 'green' }} />
                    <ThumbDownIcon />
                    <CommentIcon sx={{ ml: '1rem' }} />
                </Box>

                <div className="mt-8 flex flex-col gap-2">
                    <div className='flex flex-col gap-2'>
                        <Typography variant="p" sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} color={theme.palette.secondary[100]}>
                            <Avatar
                                sx={{ width: 30, height: 30 }}
                                alt="Remy Sharp" src="https://images.unsplash.com/photo-1516018648631-0a79b7ea609c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb25kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                            Username
                        </Typography>
                        <div
                            className='ml-10'
                        >
                            <Typography
                                variant="p"
                                color={theme.palette.secondary[200]}
                                sx={{ fontWeight: 350, fontSize: '15px', mb: 3 }}
                            >Comment</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PostDetails