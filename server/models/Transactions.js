import mongoose from "mongoose";

const transaction = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "user"
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        method: {
            type: String,
            required: true,
            default: "card"
        },
        plan: {
            type: String,
            required: true,
            default: "monthly"
        },
        status: {
            type: String,
            required: true,
            default: 'failed',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
)

const Transaction = mongoose.model("Transaction", transaction)

export default Transaction