import axios from 'axios';

const getTrades = async (userData) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_API_URL + '/trades',
            { headers: { "x-auth-token": userData.token } }).then((result) => {

                resolve(result)
            }).catch((error) => {
                console.log("Journal.js: ", error)
                reject({})

            })
    })
}

// Insert trade 
const insertTrade = async (userData, trade) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_API_URL + '/trades/new',
            { trade },
            { headers: { "x-auth-token": userData.token } }
        ).then((result) => {
            if (result.status) resolve({ status: true, message: 'Added new trade', result })
            else reject({ status: false, message: 'Failed to add trade' })
        }).catch((err) => {
            console.log(err)
            reject({ status: false, message: 'Failed to add trade' })
        })
    })
}

// Delete trade
const deleteTrade = async (userData, tradeId) => {
    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + `/trades/delete-trade/${tradeId}`,
            { headers: { "x-auth-token": userData.token } })

        return res
    }
    catch (err) {
        return err.response
    }
}

const updateTrade = async (userData, tradeData, id) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_API_URL + `/trades/update-trade/${tradeId}`,
            { tradeData },
            { headers: { "x-auth-token": userData.token } }).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })
    })
}

const getSummary = async (userData) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_API_URL + '/trades/summary',
            { headers: { "x-auth-token": userData.token } }).then((result) => {
                resolve(result)
            }).catch((error) => {
                console.log("Journal.js: ", error)
                reject({})

            })
    })
}

export const journal = {
    getTrades,
    insertTrade,
    deleteTrade,
    updateTrade,
    getSummary
}