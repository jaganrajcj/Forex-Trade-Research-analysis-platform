import axios from "axios"

const fetchUser = async () => {
    console.log("useFetchUser triggered")
    const token = localStorage.getItem("auth-token")
    if (!token)
        return ({})

    try {
        const user = await axios.get(import.meta.env.VITE_API_URL + '/users',
            { headers: { "x-auth-token": token } })

        // console.log("🚀 ~ file: useFetchUser.js:12 ~ fetchUser ~ user", user)
        if (user) return { user }

    }
    catch (err) {
        console.log(err)
    }

}

export default fetchUser

