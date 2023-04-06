import jwt from "jsonwebtoken"
import UserInfo from '../models/UserInfo.js'
import User from '../models/User.js'


export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select(['-password', '-__v', '-updatedAt'])

        // const userInfo = await UserInfo.find().select(['-createdAt', '-__v', '-updatedAt'])

        const usersWithInfo = await Promise.all(
            users.map(async (user) => {
                const info = await UserInfo.find({
                    _id: user._id
                }).select(['-createdAt', '-__v', '-updatedAt', '-_id'])
                return {
                    ...user._doc,
                    ...(JSON.parse(JSON.stringify(info)))
                }
            })
        )
        let newUser = []
        usersWithInfo.forEach((user) => {
            if (user.hasOwnProperty('0')) {
                let info = user['0']
                delete user['0']
                console.log(info)
                newUser.push({ ...JSON.parse(JSON.stringify(user)), ...JSON.parse(JSON.stringify(info)) })
            }
            else newUser.push(user)

        })
        // console.log(newUser)

        // const aggregatedRes = await User.aggregate([
        //     {
        //         $lookup: {
        //             from: "userinfos",
        //             localField: "_id",
        //             foreignField: "_id",
        //             as: "userInfo"
        //         }
        //     }
        // ])


        res.status(200).json(newUser)
    }
    catch (err) {
        console.log(err)
    }
}

export const deleteUser = async (req, res) => {
    const token = req.header("x-auth-token")
    const { userId } = req.body

    try {
        const user = await User.findById(userId)
        console.log(user)


        if (user?._id) {
            const result = await User.deleteOne({ _id: user._id })

            if (result.acknowledged) res.status(200).json({ status: true, message: "User deleted successfully" })
            else res.status(200).json({ status: false, message: "Failed to delete user!" })
        }
        else res.status(200).json({ status: false, message: "Failed to delete user!" })

    }
    catch (err) {
        res.status(200).json({ status: false, message: "Error! Failed to delete user!" })
    }

}