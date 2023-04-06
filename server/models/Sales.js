import mongoose from "mongoose";

const sales = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "user"
        },
        isPremium: {
            type: Boolean,
            default: false
        },
        validUntil: {
            type: Date,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
)

const Sales = mongoose.model("Sales", sales)

export default Sales