import Journal from '../models/Journal.js'
import jwt from "jsonwebtoken"
import { updateTradeDB } from '../services/updateTradeDB.js'

export const getTrades = async (req, res) => {
    try {

        const userId = req.userId

        await Journal.findById(userId).select(['-__v', '-createdAt', '-updatedAt']).then((journal) => {
            res.status(200).json({ status: true, journal })
        }).catch((err) => {
            res.status(404).json({ status: false, message: 'Error fetching journal' + err.message })
        })
    }
    catch (err) {
        res.status(403).json({ status: false, message: 'Error fetching journal' + err.message })

    }
}

export const newTrade = async (req, res) => {
    try {
        const userId = req.userId
        // console.log(userId)
        let { trade } = req.body
        // console.log("🚀 ~ file: trades.js:9 ~ getTrades ~ trade:", trade)
        let journal = await Journal.findById(userId).select(['-__v', '-createdAt', '-updatedAt'])

        if (!journal) journal = new Journal(
            {
                _id: userId,
                totalTrades: 0,
                winningTrades: 0,
                LosingTrades: 0,
                winRate: 0,
                initialBalance: trade?.balance,
                currentBalance: trade?.balance,
                trades: [

                ]
            }
        )

        trade.id = journal.trades.length + 1

        // trade = { ...trade, id: journal.trades.length }
        // console.log("🚀 ~ file: trades.js:31 ~ newTrade ~ trade:", trade)
        // console.log(journal.initialBalance + trade.closedPnl)

        const percGain = (100 - ((journal.currentBalance * 100) / (journal.currentBalance + trade.closedPnl))).toFixed(3);
        trade.change = percGain

        if (trade.direction === 'Long') {
            if (trade.entry < trade.exit) trade.status = "Win"
            else if (trade.entry > trade.exit) trade.status = "Loss"
            else trade.status = "Breakeven"
        }
        else {
            if (trade.entry > trade.exit) trade.status = "Win"
            else if (trade.entry < trade.exit) trade.status = "Loss"
            else trade.status = "Breakeven"
        }

        journal.currentBalance += trade.closedPnl

        journal.totalTrades++
        if (trade.status == "Win") journal.winningTrades++
        else journal.LosingTrades++

        journal.winRate = ((journal.winningTrades * 100) / journal.totalTrades).toFixed(2)

        journal.trades.push(trade)
        console.log(journal)

        journal.save().then((result) => {
            res.status(200).json({ status: true, result })
        }).catch((error) => {
            res.status(403).json({ status: false, error })
        })

    }
    catch (err) {
        res.status(403).json({ status: false, message: 'Error adding trade' + err.message })
    }
}

// Delete trade function
export const deleteTrade = async (req, res) => {
    try {
        const userId = req.userId
        const { id } = req.params

        if (!id) return res.status(403).json({ status: false, message: 'Error deleting trade' })

        const journal = await Journal.findById(userId).select(['-__v', '-createdAt', '-updatedAt'])

        if (!journal) return res.status(404).json({ status: false, message: "Couldn't find any trades of the given user" })

        journal.trades.splice(id - 1, 1)

        for (let i = id - 1; i < journal.trades.length; i++) journal.trades[i].id--

        journal.save().then(() => {
            updateTradeDB(userId).then((result) => {
                return res.status(200).json({ status: true, result })
            }).catch((err) => {
                return res.status(403).json({ status: false, message: err.message })
            })
        }).catch((err) => {
            res.status(403).json({ status: false, message: 'Error deleting trade' })

        })

    }
    catch (err) {
        res.status(403).json({ status: false, message: 'Error deleting trade' })
    }
}

// Update trade
export const updateTrade = async (req, res) => {
    try {
        const userId = req.userId
        const { id } = req.params

        if (!id) return res.status(403).json({ status: false, message: 'Invalid trade ID' })

        const journal = await Journal.findById(userId).select(['-__v', '-createdAt', '-updatedAt'])

        if (!journal) return res.status(404).json({ status: false, message: "Couldn't find any trades of the given user" })

        // journal.trades.
        // complete rest of the codes

    }
    catch (err) {
        res.status(403).json({ status: false, message: 'Error updating trade' })
    }
}

// Get trade summary
export const getTradeSummary = async (req, res) => {
    try {
        const userId = req.userId

        const journal = await Journal.findById(userId).select(['-_id', '-__v', '-createdAt', '-updatedAt'])
        if (!journal) return res.status(404).json({ status: false, message: "Couldn't find any trades of the given user" })

        let response = journal._doc
        let marketWithCount = {}

        const trades = journal.trades
        // delete response['trades'][]

        const getUniquePairs = (arr, key) => {
            const uniqueValues = new Set();
            for (const obj of arr) {
                uniqueValues.add(obj[key]);
            }
            return Array.from(uniqueValues);
        }

        const uniquePairs = getUniquePairs(trades, "market")
        uniquePairs.forEach((market) => {
            let count = 0;
            for (let i = 0; i < trades.length; i++) {
                if (trades[i].market === market) count++
            }
            marketWithCount[market.toLowerCase()] = count
        })

        // console.log(marketWithCount)
        response["tradeCount"] = marketWithCount

        res.status(200).json(response)
    }
    catch (err) {
        console.log(err.message)
        res.status(403).json({ status: false, message: 'Error fetching trade summary' })
    }
}

export const getOverviewChartData = (req, res) => {
    try {
        const userId = req.userId

    }
    catch (err) {
        res.status(403).json({ status: false, error: err.message })
    }
}