import Journal from '../models/Journal.js'

export const updateTradeDB = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const journal = await Journal.findById(userId)

            if (!journal) reject({ status: false, message: 'Could not find trade journal' })

            journal.totalTrades = journal.trades.length

            let winners = 0
            let losers = 0
            let pnl = 0

            journal.trades.forEach((trade) => {
                if (trade.status === "Win") winners++
                else losers++

                pnl += trade.closedPnl
            })
            journal.winningTrades = winners
            journal.LosingTrades = losers
            journal.currentBalance = journal.initialBalance + pnl
            journal.winRate = (winners / journal.trades.length) * 100

            journal.save().then((res) => resolve(res)).catch((err) => reject({ status: false, message: err.message }))

        }
        catch (err) {
            reject({ status: false, message: err.message })
        }
    })
}