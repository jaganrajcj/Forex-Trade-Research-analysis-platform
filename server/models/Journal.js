import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        totalTrades: Number,
        winningTrades: Number,
        LosingTrades: Number,
        winRate: Number,
        initialBalance: Number,
        currentBalance: Number,
        trades: [
            {
                id: Number,
                date: String,
                direction: String,
                market: String,
                entry: Number,
                balance: Number,
                size: Number,
                sl: Number,
                target: Number,
                exit: Number,
                closedPnl: Number,
                change: Number,
                status: String,
                notes: String
            }
        ],
    },
    { timestamps: true }
)

const Journal = mongoose.model("journal", journalSchema)
export default Journal