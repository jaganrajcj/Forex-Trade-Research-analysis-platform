import mongoose, { mongo } from 'mongoose';

const InterestRateSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        usd: {
            "central_bank": {
                type: String,
                default: "American FED"
            },
            country: {
                type: String,
                default: "United States"
            },
            rate: Number,
        },
        gbp: {
            "central_bank": {
                type: String,
                default: "British BoE"
            },
            country: {
                type: String,
                default: "Great Britain"
            },
            rate: Number,
        },
        eur: {
            "central_bank": {
                type: String,
                default: "European ECB"
            },
            country: {
                type: String,
                default: "Europe"
            },
            rate: Number,
        },
        jpy: {
            "central_bank": {
                type: String,
                default: "The Bank of Japan"
            },
            country: {
                type: String,
                default: "Japan"
            },
            rate: Number,
        },
        chf: {
            "central_bank": {
                type: String,
                default: "Swiss SNB"
            },
            country: {
                type: String,
                default: "Switzerland"
            },
            rate: Number,
        },
        cad: {
            "central_bank": {
                type: String,
                default: "Canadian BOC"
            },
            country: {
                type: String,
                default: "Canada"
            },
            rate: Number,
        },
        aud: {
            "central_bank": {
                type: String,
                default: "Australian RBA"
            },
            country: {
                type: String,
                default: "Australia"
            },
            rate: Number,
        },
        nzd: {
            "central_bank": {
                type: String,
                default: "New Zealand"
            },
            country: {
                type: String,
                default: "New Zealand"
            },
            rate: Number,
        },

    }
)

const InterestRates = mongoose.model('InterestRates', InterestRateSchema)
export default InterestRates