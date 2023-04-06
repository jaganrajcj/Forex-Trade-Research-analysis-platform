import Stripe from 'stripe';
import dotenv from 'dotenv'
import PremiumUser from '../models/PremiumUsers.js';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
    [1, { priceInCents: 500, name: 'Monthly Plan' }],
    [2, { priceInCents: 5000, name: 'Yearly Plan' }],
])

export const createPayment = async (req, res) => {
    try {

        const item = req.body
        const storeItem = storeItems.get(item.id)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: storeItem.name,
                    },
                    unit_amount: storeItem.priceInCents
                },
                quantity: 1,
            }],
            success_url: process.env.CLIENT_URL + `/dashboard/premium/upgrade-success?paymentStatus=success&plan=${item.id}&planName=${storeItem.name}&paymentMethod=card&currency=usd&amount=${storeItem.priceInCents}`,
            cancel_url: process.env.CLIENT_URL + '/dashboard/premium/upgrade-failed'
        })

        res.status(200).json({ url: session.url })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

export const upgradeUser = async (req, res) => {
    try {
        const { paymentStatus, plan, planName, paymentMethod, currency, amount } = req.body;

        if (!paymentStatus || !plan || !planName || !paymentMethod || !currency || !amount)
            throw {
                message: 'Incomplete fields',
                statusCode: 403
            }
        const userId = req.userId

        const getExpiryDate = (plan) => {
            const today = new Date();
            let date;

            if (plan === 1) {
                date = new Date(today.setDate(today.getDate() + 30));
            } else if (plan === 2) {
                date = new Date(today.setFullYear(today.getFullYear() + 1));
            } else {
                throw {
                    message: 'Invalid plan',
                    statusCode: 403
                }
            }

            return date;
        }

        if (paymentStatus === 'success') {
            let newPremiumUser = await PremiumUser.findOne({ userId: userId })

            if (!newPremiumUser) {
                newPremiumUser = new PremiumUser({
                    userId: userId,
                    isPremium: true,
                    validUntil: getExpiryDate(parseInt(plan))
                }).save().then((response) => {
                    res.status(200).json({ status: true, message: 'Welcome to premium' })
                }).catch(() => {
                    throw {
                        message: 'Payment failed',
                        statusCode: 500
                    }
                })
            }
            else {
                if (newPremiumUser.isPremium) {
                    return res.status(200).json({ status: true, message: 'You are already a premium member' })
                }
                else {
                    newPremiumUser.isPremium = true
                    newPremiumUser.validUntil = getExpiryDate(parseInt(plan))

                    newPremiumUser.save().then((response) => {
                        res.status(200).json({ status: true, message: 'Welcome back to premium' })
                    }).catch(() => {
                        throw {
                            message: 'Something went wrong',
                            statusCode: 500
                        }
                    })
                }
            }

        }
        else throw {
            message: 'Payment failed',
            statusCode: 403
        }
    }
    catch (err) {
        res.status(err?.statusCode || 500).json({ error: err.message })
    }
}