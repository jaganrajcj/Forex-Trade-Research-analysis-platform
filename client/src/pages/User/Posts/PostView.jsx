import React from 'react'
import { useState } from 'react'
import CircularLoad from '@/components/CircularLoad'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import useGetTheme from '@/hooks/useGetTheme'
import ErrorBoundary from '@/components/ErrorBoundary'
import PostDetails from './PostView/PostDetails'
import UserDetails from './PostView/UserDetails'
import OtherPosts from './PostView/OtherPosts'
import useAuth from '@/hooks/useAuth'
import axios from 'axios'

const PostView = () => {

    const [isLoading, setIsLoading] = useState(true)

    // const params = useParams()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get('id');
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")
    const theme = useGetTheme()

    const params = new URLSearchParams(location.search);
    const paramValue = params.get("id");
    const [post, setPost] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    const { userData } = useAuth()

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + `/posts/view-post?id=${paramValue}`,
            { headers: { "x-auth-token": userData.token } }
        )
            .then((response) => {
                console.log(response.data);
                if (response.data.post) setPost(response.data.post)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }, [])


    useEffect(() => {
        console.log(postId)
    }, [])



    return (

        !isLoading ? (
            <>
                <div className='grid justify-center items-center m-auto'>
                    <Box
                        mt="30px"
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gridAutoRows="250px"
                        gap="20px"
                        sx={{
                            // backgroundColor: theme.palette.ternary[600],
                            // ml: 'auto',
                            // mr: '100px',
                            // width: '80%',
                            maxWidth: isNonMediumScreens ? '1100px' : '100%',
                            justifyContent: 'end',
                            "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" }
                        }}>
                        <Box
                            gridColumn="span 8"
                            gridRow="span 3"
                            color={theme.palette.secondary[100]}
                            backgroundColor={theme.palette.custom[100]}
                            sx={{
                                boxShadow: 3,
                                borderRadius: '.2rem',
                                border: 1,
                                p: 0,
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400],
                                // overflow: 'auto'
                            }}
                            className={`overflow-y-auto scrollbar-thin scrollbar-thumb-[#359AEF] scrollbar-track-[${theme.palette.custom[300]}] scrollbar-thumb-rounded`}
                        >
                            <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                                <PostDetails post={post} />
                            </ErrorBoundary>
                        </Box>
                        <Box
                            gridColumn="span 4"
                            gridRow="span 1"
                            color={theme.palette.secondary[100]}
                            backgroundColor={theme.palette.custom[100]}
                            sx={{
                                boxShadow: 3,
                                borderRadius: '.2rem',
                                border: 1,
                                p: 2,
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400]
                            }}
                        >
                            <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                                <UserDetails />
                            </ErrorBoundary>
                        </Box>
                        <Box
                            gridColumn="span 4"
                            gridRow="span 2"
                            color={theme.palette.secondary[100]}
                            backgroundColor={theme.palette.custom[100]}
                            sx={{
                                boxShadow: 3,
                                borderRadius: '.2rem',
                                border: 1,
                                p: 2,
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.secondary[900] : theme.palette.secondary[400]
                            }}
                        >
                            <ErrorBoundary fallback={<>Error occured while loading compoenent</>}>
                                <OtherPosts />
                            </ErrorBoundary>
                        </Box>

                    </Box>
                </div>
            </>
        )
            : (
                <>
                    <CircularLoad />
                </>
            )

    )

}

export default PostView