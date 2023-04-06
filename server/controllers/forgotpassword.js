import User from '../models/User.js'
import Token from '../models/Token.js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { sendEmail } from '../utils/sendEmail.js'

export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body

        const user = await User.findOne({ email: email }).select(['_id', 'email'])
        if (!user) return res.status(404).json({ status: false, message: "User with the given email doesn't exists!" });

        let token = await Token.findOne({ userId: user._id })
        if (!token)
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()

        console.log(`Password reset link: ${process.env.BASE_URL}auth/forgot-password/reset/${token.token}`)
        sendEmail(email, "Password reset code", `${process.env.BASE_URL}auth/forgot-password/reset/${token.token}`)

        res.status(200).json({ status: true, message: "Password reset code sent to your email account" })

    }
    catch (err) {
        res.status(500).json({ status: false, message: 'Error generating password reset token!' + err.message });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const token = req.params.token
        const { password, confirmPassword } = req.body
        // console.log(password, confirmPassword, token)

        if (password != confirmPassword) return res.status(403).json({ status: false, message: 'Mismatching passwords!' })

        const tokenValidity = await Token.findOne({ token: token })

        if (tokenValidity) {
            const user = await User.findById(tokenValidity.userId)
            if (!user) return res.status(403).json({ status: false, message: 'Something went wrong while updating password!' })

            console.log(user)

            const salt = bcrypt.genSaltSync(10);
            user.password = await bcrypt.hash(password, salt)

            user.save().then((user) => {
                res.status(200).json({ status: true, message: 'Password updated successfully' })

            }).catch(() => {
                res.status(403).json({ status: false, message: 'Error updating password!' })
            })


        } else {
            res.status(403).json({ status: false, message: 'Error updating password!' })
        }

    }
    catch (err) {
        res.status(500).json({ status: false, message: 'Error updating password!' + err.message });
    }
}

export const checkTokenValidity = async (req, res) => {
    try {
        const token = req.params.token

        const tokenValidity = await Token.findOne({ token: token })

        if (tokenValidity) res.status(200).json({ status: true, message: 'Valid token' })
        else res.status(404).json({ status: false, message: 'Invalid token' })
    }
    catch (err) {
        res.status(404).json({ status: false, message: 'Invalid token' });
    }
}

