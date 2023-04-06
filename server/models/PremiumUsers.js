import mongoose from "mongoose";

const premiumUser = new mongoose.Schema(
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
        plan: {
            type: String,
            required: true,
            default: "monthly"
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

const PremiumUser = mongoose.model("PremiumUser", premiumUser)

export default PremiumUser