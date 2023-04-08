import jwt from "jsonwebtoken"
import UserInfo from '../models/UserInfo.js'
import User from '../models/User.js'
import PremiumUser from "../models/PremiumUsers.js"


export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select(['-password', '-__v', '-updatedAt'])

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

        res.status(200).json(newUser)
    }
    catch (err) {
        console.log(err)
    }
}

export const getProUsers = async (req, res) => {
    try {
        const result = await PremiumUser.aggregate([
            // Find all documents in the premiumusers collection
            {
                $match: {}
            },
            // Look up userinfos and users documents based on userId
            {
                $lookup: {
                    from: 'userinfos',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userinfo'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: '$userId' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                        { $project: { name: 1, email: 1, createdAt: 1 } }
                    ],
                    as: 'user'
                }
            },
            // Unwind the arrays returned by the lookups
            {
                $unwind: '$userinfo'
            },
            {
                $unwind: '$user'
            },
            // Merge the userinfo and user objects into a single output object
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            '$userinfo',
                            { isPremium: '$isPremium', name: '$user.name', email: '$user.email', createdAt: '$user.createdAt' }
                        ]
                    }
                }
            }
        ])
        res.status(200).json(result)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

export const getAdminUsers = async (req, res) => {
    try {
        const result = await User.aggregate([
            // Match users with role "admin"
            {
                $match: { role: "admin" }
            },
            // Join with userinfos collection based on the _id field
            {
                $lookup: {
                    from: "userinfos",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userinfo"
                }
            },
            // Unwind the userinfo array
            {
                $unwind: "$userinfo"
            },
            // Project the desired fields
            {
                $project: {
                    _id: 1,
                    email: 1,
                    name: 1,
                    createdAt: 1,
                    userinfo: 1
                }
            },
            // Merge the userinfo object into the parent object
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$userinfo", "$$ROOT"]
                    }
                }
            },
            // Remove the userinfo field
            {
                $project: {
                    userinfo: 0
                }
            }
        ])

        res.status(200).json(result)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
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