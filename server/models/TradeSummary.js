import mongoose from "mongoose";

const tradeSummarySchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        totalTrades: Number,
        winningTrades: Number,
        LosingTrades: Number,
        winRate: Number,
        initialBalance: Number,
        currentBalance: Number,
        profitFactor: Number,
        maxDrawDown: Number,
        MaxProfit: Number,
        bestWinStreak: Number,
        bestLosingStreak: Number,
        profitFromInstrument: Number,
        tradeCount: {},
        monthlyData: [],
        tradingVolume: [],
    },
    { timestamps: true }
)

const TradeSummary = mongoose.model("TradeSummary", tradeSummarySchema)
export default TradeSummary