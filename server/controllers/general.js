import User from '../models/User.js'
import UserInfo from '../models/UserInfo.js'
import Token from '../models/Token.js'
import crypto from 'crypto'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import PremiumUsers from '../models/PremiumUsers.js'
import { sendEmail } from '../utils/sendEmail.js'


export const login = async (req, res) => {
    try {
        // Add validations
        const { email, password } = req.body;

        const user = await User.findOne({ email: email })
        // console.log(user)
        if (!user) res.status(404).json({ message: "Invalid username or password" })
        else {
            const isMatch = await bcrypt.compare(password, user.password)
            // console.log("🚀 ~ file: general.js:14 ~ login ~ isMatch", isMatch)
            if (!isMatch)
                return res.status(403).json({ message: "Invalid username or password" })

            const payload = {
                user: {
                    id: user._id,
                    type: user.role == 'user' ? 2000 : (user.role == 'moderator' ? 2300 : 2400)
                }
            }
            // Roles
            // 2000 - normal user
            // 2300 - moderator
            // 2400 - admin
            const isUserPremium = await PremiumUsers.findOne({ userId: user._id })
            const plan = isUserPremium?.isPremium ? 'Premium' : 'Basic'
            const userType = user.role == "user" ? 3 : (user.role == "moderator" ? 2 : 1)

            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '15 days' },
            )

            let response = {
                id: user._id,
                email: user.email,
                name: user.name,
                type: userType,
                authorized: true,
                token: token,
                plan: plan
            }
            // console.log(genJWT())

            res.status(200).json(response)

        }
    }
    catch (err) {
        res.status(403).json({ message: err.message })
    }
}

export const register = async (req, res) => {
    try {

        // Add validations
        // Change user role to hardcoded value

        const user = {
            name: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            role: 'user'
        }
        // console.log("🚀 ~ file: general.js:36 ~ register ~ user", user)

        // Hash user password
        const salt = bcrypt.genSaltSync(10);
        user.password = await bcrypt.hash(req.body.password, salt)

        const insertResult = await User.create(user)
        const userInfo = await UserInfo.create({ _id: insertResult._id, firstName: req.body.firstName, lastName: req.body.lastName })
        console.log(insertResult)
        if (insertResult._id) res.status(200).json({
            status: true,
            message: "Signup successful"
        })
        else res.status(403).json({
            status: false,
            message: "Signup failed"
        })
    }
    catch (err) {
        // add handlers for duplicate error
        const error = err.message.substr(0, 6)
        if (error === 'E11000') res.status(403).json({
            status: false,
            message: "User already exists"
        })
        // res.status(403).json({ message: err.message })
    }
}
export const getUser = async (req, res) => {
    try {
        // send complete user info only if the user is authenticated and the id matches
        const token = req.header("x-auth-token")
        if (!token) res.status(403).json({ status: false, message: 'Invalid token' })
        else {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            console.log("🚀 ~ file: general.js:99 ~ getUser ~ decodedToken", decodedToken.user.id)

            const isUserPremium = await PremiumUsers.findOne({ userId: decodedToken.user.id })
            const plan = isUserPremium?.isPremium ? 'Premium' : 'Basic'

            const user = await User.findById(decodedToken.user.id).select(['name', 'email', '_id', 'role'])
            const userInfo = await UserInfo.findById(decodedToken.user.id).select(['-_id', '-createdAt', '-updatedAt', '-__v'])

            if (user.email) {
                const userType = user.role == "user" ? 3 : (user.role == "moderator" ? 2 : 1)

                let newUser2 = JSON.parse(JSON.stringify(userInfo)) || {}

                res.status(200).json({ status: true, id: user._id, name: user.name, email: user.email, type: userType, plan: plan, ...newUser2 })
            }
            else res.status(200).json({ status: false, message: 'User does not exist' })
        }
    }
    catch (err) {
        res.status(200).json({ status: false, message: 'User does not exist' })
    }
}

