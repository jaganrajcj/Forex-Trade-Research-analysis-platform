import User from '../models/User.js'
import UserInfo from '../models/UserInfo.js'
import jwt from "jsonwebtoken"
import path from "path"
import multer from "multer"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from 'uuid';

export const updateUser = async (req, res) => {
    try {

        const token = req.header("x-auth-token")
        const { name, email } = req.body
        const { firstName, lastName, phone, about, location } = req.body

        if (!token) res.status(403).json({ status: false, message: 'Invalid token' })
        else {

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            let user = await User.findById(decodedToken?.user.id)
            let userInfo = await UserInfo.findById(decodedToken?.user.id)
            // console.log("🚀 ~ file: user.js:23 ~ updateUser ~ userInfo:", userInfo)

            if (!userInfo)
                userInfo = new UserInfo({ _id: decodedToken?.user.id })

            // Update user model
            name ? user.name = name : null;
            email ? user.email = email : null

            // Update userInfo model
            firstName ? userInfo.firstName = firstName : null
            lastName ? userInfo.lastName = lastName : null
            phone ? userInfo.phone = phone : null
            about ? userInfo.about = about : null
            location ? userInfo.location = location : null

            // user = Object.assign(user, name, email)
            await user.save()
            await userInfo.save()

            res.status(200).json({ status: true, message: 'Update Successful' })
            // res.status(200).json(user)
        }
    }
    catch (err) {
        res.status(500).json({ status: false, message: 'Error updating user' + err.message })
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const imagePath = uuidv4() + '-' + Date.now() + path.extname(file.originalname)
        // console.log("Req: ", req.body)
        cb(null, imagePath);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

export let uploadImage = multer({ storage, fileFilter });

export const updateProfileImage = async (req, res) => {
    try {
        const photo = req.file.filename
        const token = req.header("x-auth-token")

        if (!token) return res.status(403).json({ status: false, message: "Invalid token" })

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userInfo = await UserInfo.findById(decodedToken.user.id)

        userInfo.profileImage = photo
        userInfo.save().then(() => {
            res.status(200).json({ status: true, message: "Image saved successfully" })
        }).catch((err) => {
            res.status(403).json({ status: false, message: "Image upload failed! " + err.message })
        })

    }
    catch (err) {
        res.status(403).json({ status: false, message: "Failed to update image!" })
    }
    // console.log(photo)
    // const { image } = req.body
    // console.log("File received")

    // res.status(200).json({})
}

export const changePassword = async (req, res) => {
    try {
        const userId = req.userId

        const { currentPassword, newPassword } = req.body

        const user = await User.findById(userId)

        const isMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isMatch) return res.status(200).json({ status: false, message: "Invalid current password!" })

        const salt = bcrypt.genSaltSync(10);
        user.password = await bcrypt.hash(newPassword, salt)

        user.save().then((result) => {

            if (result._id) res.status(200).json({ status: true, message: 'Password change successful' })
            else res.status(200).json({ status: false, message: 'Error changing password' })

        }).catch((err) => {
            res.status(404).json({ status: false, message: 'Error changing password' + err.message })
        })

    }
    catch (err) {
        res.status(403).json({ status: false, message: 'Error changing password' + err.message })

    }
}