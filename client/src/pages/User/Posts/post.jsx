import useGetTheme from '@/hooks/useGetTheme'
import useMode from '@/hooks/useMode'
import { Avatar, Chip, LinearProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@material-tailwind/react'
import CircularLoad from '@/components/CircularLoad'
import axios from 'axios'
import useAuth from '@/hooks/useAuth'
import AlertBar from '@/components/Alertbar'

const Post = ({ setCurrentView }) => {

    const theme = useGetTheme()
    const mode = useMode()
    const postId = 12345
    const [isLoading, setIsLoading] = useState(true)
    const { userData } = useAuth()
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(false)

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const fetchPosts = async () => {
        axios.get(import.meta.env.VITE_API_URL + '/posts/',
            { headers: { "x-auth-token": userData.token } }
        ).then((res) => {
            console.log(res.data.data)
            setPosts(res.data.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }).catch((err) => {
            console.log(err)
            setError(true)
        })
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className='flex flex-col gap-6 justify-center w-full h-full items-center'>
            <Box
                sx={{
                    width: '800px',
                    height: '65px',
                    boxShadow: 3,
                    borderRadius: '.2rem',
                    border: 1,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderColor: mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400]
                }}
                backgroundColor={theme.palette.custom[100]}
            >
                <div className="flex flex-row gap-2">
                    <Button variant='text' className="h-10 flex flex-row gap-1 items-center " color="#359AEF" sx={{ borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                        </svg>
                        Top
                    </Button>
                    <Button variant='text' className="h-10 flex flex-row gap-1 items-center bg-[rgba(53, 154, 239, 0.2)]" color="#359AEF" sx={{ borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>

                        New
                    </Button>

                </div>
                <div>
                    <Button
                        onClick={() => navigate('new-post')}
                        variant='gradient' className="h-10 flex flex-row gap-1 items-center bg-[rgba(53, 154, 239, 0.2)]" color="#359AEF" sx={{ borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        NEW POST
                    </Button>
                </div>
            </Box>

            {
                !isLoading ?
                    posts.map((post, index) => (
                        <Box
                            key={index}
                            display="grid"
                            // gridTemplateRows="1fr auto 1fr"
                            // gridAutoRows="220px"
                            sx={{
                                width: '800px',
                                // height: '400px',
                                boxShadow: 3,
                                borderRadius: '.2rem',
                                border: 1,
                                borderColor: mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400]
                            }}
                            color={theme.palette.secondary[100]}
                            backgroundColor={theme.palette.custom[100]}
                        >
                            <Box sx={{ py: 2, px: 2, display: 'flex', flexDirection: 'row', gap: '10px', borderBottom: 1, borderBottomColor: mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400] }}>
                                <Avatar
                                    sx={{ width: 45, height: 45 }}
                                    alt="Remy Sharp" src={post.profileImage ? `http://localhost:5001/user-uploads/images/${post?.profileImage}` : 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'} />
                                <div className="flex flex-col gap-0">
                                    <Typography variant='h6' color={theme.palette.secondary[100]} fontWeight="bold" sx={{ fontSize: '15px', fonWeight: 'bold' }}>{post?.name || ' '}</Typography>
                                    <Typography variant='small' color={theme.palette.secondary[200]} fontWeight="light" sx={{ fontSize: '14px', fonWeight: 'bold' }}>@{post?.userName || ' '}</Typography>

                                </div>
                            </Box>

                            <Box sx={{ mx: 2, my: 2, p: 1, mb: 1, border: 1, borderColor: mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400], display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => navigate(`view-post?id=${post._id}`)}
                            >
                                <div className='flex flex-col gap-3 flex-1 w-full h-full '>
                                    <Typography variant="h5" color={theme.palette.secondary[100]} fontWeight="bold" sx={{ fontSize: '18px' }}>
                                        {post?.title || ''}
                                    </Typography>

                                    <div className="flex fle-row gap-2">
                                        <Chip color={post.bias === 'Bullish' ? 'success' : (post.bias === 'Bearish' ? 'error' : 'default')} size="small" icon={
                                            post.bias === 'Bullish' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                            </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                                </svg>
                                        } label={post.bias || ' '} />

                                        <Chip color="info" size="small" label={post.market || ' '} />
                                    </div>
                                    <Typography variant="small" color={theme.palette.secondary[100]} fontWeight="light" sx={{ fontSize: '15px' }}>
                                        {post?.description.slice(0, 220) || ''}<span className="text-blue-500">....more</span>
                                    </Typography>
                                </div>
                                <div className='w-[50%]'>
                                    <img src={`http://localhost:5001/trade-images/${post?.imageSource}`} alt="" />
                                </div>
                            </Box>

                            <Box sx={{ py: 1, px: 2, display: 'flex', flexDirection: 'row', gap: '10px', borderBottom: 1, borderBottomColor: mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400] }}>
                                <span className="cursor-pointer ">
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z" /></svg>
                                </span>
                                <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z" /></svg>
                                <CommentIcon sx={{ ml: '1rem' }} />
                            </Box>
                        </Box >
                    ))



                    : <Box sx={{ zIndex: 9999, width: '800px' }}>
                        <LinearProgress sx={{ zIndex: 1000 }} />
                    </Box>
            }
            {error && <AlertBar info={{ open: true, message: 'Error fetching posts', severity: 'error' }} />}
        </div>

    )
}

export default Post