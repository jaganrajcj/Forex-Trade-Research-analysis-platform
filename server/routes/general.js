import express from 'express'
import { login, register, getUser } from '../controllers/general.js'
import { forgotPassword, resetPassword, checkTokenValidity } from '../controllers/forgotpassword.js'
import { updateUser, updateProfileImage, uploadImage, changePassword } from '../controllers/user.js'
import userAuth from "../middlewares/userAuth.js"


const router = express.Router()


router.get('/', getUser)
router.post("/login", login)
router.post("/register", register)
router.post("/forgot-password", forgotPassword)
router.post("/forgot-password/reset/:token", resetPassword)
router.get("/forgot-password/is-token-valid/:token", checkTokenValidity)
// router.post("/reset-password", resetPassword)
// User routes
router.post("/update", userAuth, updateUser)
router.post("/change-password", userAuth, changePassword)

router.post("/update/profile-image", uploadImage.single('photo'), updateProfileImage)

export default router
