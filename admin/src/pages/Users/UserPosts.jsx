import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import EditMenu from '../../partials/EditMenu'
import CircularLoader from '../../partials/CircularLoader'

const UserPosts = () => {


    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { userData } = useAuth()

    const fetchUserPosts = async () => {
        axios.get(import.meta.env.VITE_API_URL + '/posts',
            { headers: { "x-auth-token": userData.token } }
        ).then((res) => {
            setPosts(res.data.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 700)

        }).catch((error) => {
            console.log(error.response)
        })
    }

    useEffect(() => {
        fetchUserPosts()
    }, [])

    return (
        !isLoading ?
            <>
                <div className="px-4 sm:px-6 lg:px-6 py-8 w-full max-w-10xl mx-auto  h-[90%]">
                    <div className="flex justify-between items-center mb-3 w-full">
                        <h2 className="text-2xl font-bold capitalize">USER POSTS</h2>
                    </div>
                    <div className="flex flex-row flex-wrap gap-8 justify-between">

                        {/* Post cards */}

                        {
                            posts?.map((post) => (
                                <div className="max-w-sm w-[350px] border h-[486px] border-slate-800 rounded-lg shadow bg-slate-800 flex flex-col " key={post._id}>
                                    <a href="#">
                                        <img className="rounded-t-lg max-h-[195px] h-[195px] object-fill w-full" src={`${import.meta.env.VITE_SERVER_URL}/trade-images/${post.imageSource}`} alt="" />
                                    </a>
                                    <div className="p-5 flex flex-col justify-between h-full">
                                        {/* <EditMenu className="relative flex justify-end">
                                            <li>
                                                <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
                                            </li>
                                            <li>
                                                <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
                                            </li>
                                            <li>
                                                <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>
                                            </li>
                                        </EditMenu> */}

                                        <div>
                                            <a href="#">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                                            </a>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-1">{post?.description.slice(0, 150) || ''}</p>
                                        </div>

                                        <div className="flex flex-row gap-4 items-center">
                                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Read more
                                                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </a>
                                            <div class="flex mr-2 text-gray-200 text-sm ">
                                                <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                <span>{post.upVotes}</span>
                                            </div>
                                            <div class="flex mr-2 text-gray-200 text-sm">
                                                <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                                </svg>
                                                <span>{post.comments.length}</span>
                                            </div>
                                            <EditMenu className="relative flex justify-end flex-1">
                                                <li>
                                                    <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
                                                </li>
                                                <li>
                                                    <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
                                                </li>
                                                <li>
                                                    <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>
                                                </li>
                                            </EditMenu>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </>
            : <CircularLoader />
    )
}

export default UserPosts