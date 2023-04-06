import CircularLoad from '@/components/CircularLoad';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Success = ({ setIsUserPremium }) => {

    const { userData } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // get the search query string from the URL
        const searchParams = new URLSearchParams(window.location.search);

        // create an object to store the query parameters
        const queryParams = {};

        // loop through all the query parameters and add them to the object
        for (const [key, value] of searchParams.entries()) {
            queryParams[key] = value;
        }

        // do something with the queryParams object
        // console.log(queryParams);

        axios.post(import.meta.env.VITE_API_URL + '/subscription/upgrade-user',
            queryParams,
            { headers: { "x-auth-token": userData.token } }
        ).then((res) => {
            console.log('Payment intent created')
            setIsUserPremium(true)
            navigate(`/dashboard/premium?upgrade=success?message=${res.data.message}`)
        }).catch((err) => {
            console.log(err.response.data)
        })
    }, []);

    return (
        <CircularLoad />
    )
}

export default Success