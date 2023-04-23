import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { createPayment, upgradeUser, getSubscriptionDetails, cancelSub } from '../controllers/subscriptions.js'

const router = express.Router()


router.get('/', userAuth, getSubscriptionDetails)
router.post('/create-payment-intent', userAuth, createPayment)
router.post('/upgrade-user', userAuth, upgradeUser)
router.get('/cancelSub', userAuth, cancelSub)


export default router