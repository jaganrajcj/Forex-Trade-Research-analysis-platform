import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { createPayment, upgradeUser } from '../controllers/subscriptions.js'

const router = express.Router()

router.get('/', userAuth, (req, res) => {
    res.status(200).json({})
})

router.post('/create-payment-intent', userAuth, createPayment)
router.post('/upgrade-user', userAuth, upgradeUser)


export default router