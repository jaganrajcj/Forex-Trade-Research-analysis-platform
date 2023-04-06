import mongoose from "mongoose";

const gauge = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "user"
        },
        intraDay: {
            type: Number,
            required: true,
        },
        swing: {
            type: Number,
            required: true,
        },
        positional: {
            type: Number,
            required: true,
        },
        longTerm: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
)

const Gauge = mongoose.model("Gauge", gauge)

export default Gauge