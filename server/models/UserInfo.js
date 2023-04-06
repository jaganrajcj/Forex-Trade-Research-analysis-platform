import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        firstName: {
            type: String,
            required: false,
            min: 2,
            max: 100
        },
        lastName: {
            type: String,
            required: false,
            min: 2,
            max: 100
        },
        address1: {
            type: String,
            required: false,
            min: 2,
            max: 100
        },
        address2: {
            type: String,
            required: false,
            min: 2,
            max: 100
        },
        phone: {
            type: String,
            required: false,
            min: 8,
            max: 15
        },
        about: {
            type: String,
            required: false,
            min: 5,
            max: 200
        },
        profileImage: {
            type: String,
            required: false,
        },
        location: {
            type: String,
            required: false,
            min: 2,
            max: 100
        }
    },
    { timestamps: true }
)
const UserInfo = mongoose.model("UserInfo", userInfoSchema)

export default UserInfo