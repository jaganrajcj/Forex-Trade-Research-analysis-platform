import mongoose from 'mongoose';

const COTschema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        commitMentData: []
    },
    { timestamps: true }
)

const COT = mongoose.model("cotData", COTschema)
export default COT