import axios from "axios"
import useAuth from "@/hooks/useAuth"

const getUsers = async (userData) => {

    try {
        const users = await axios.get(import.meta.env.VITE_API_URL + '/administrative/users',
            { headers: { "x-auth-token": userData.token } })

        if (users.data.length) return users.data
        else return null

    }
    catch (err) {
        console.log("Something went wrong while fetching users, adminService.js")
        return null
    }
}

const deleteUser = async (userData, userId) => {
    try {
        const returnedRes = await axios.post(import.meta.env.VITE_API_URL + '/administrative/deleteUser',
            { userId },
            { headers: { "x-auth-token": userData.token } })

        if (returnedRes.data?.status) return ({ "status": true, "message": "Used deletion successful" })
        else return ({ "status": false, "message": "Used deletion failed" })

    }
    catch (err) {
        console.log("Something went wrong while fetching users, adminService.js")
        return ({ "status": false, "message": "Used deletion failed" })
    }
}

export const adminServices = {
    getUsers,
    deleteUser
}