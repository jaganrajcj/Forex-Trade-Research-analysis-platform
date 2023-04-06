import axios from 'axios';

const getStatCardData = async (userData) => {
    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/administrative/getStat',
            { headers: { "x-auth-token": userData.token } }
        )

        if (res.status === 200) {
            return res.data
        }
        else return {}
    }
    catch (error) {
        return {}
    }
}


export const dashboardServices = {
    getStatCardData
}