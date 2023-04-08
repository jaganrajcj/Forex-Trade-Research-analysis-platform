import Stripe from 'stripe';
import dotenv from 'dotenv'
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const getAllPayments = (req, res) => {
    try {

        const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
        stripe.charges.list(
            { expand: ['data.customer'] },
            (err, charges) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const doc = []
                // console.log(`Found ${charges.data.length} charges.`);
                charges.data.forEach((charge) => {
                    // console.log(`Payment ID: ${charge.id}, Amount: ${charge.amount}, Currency: ${charge.currency}, Customer Email: ${charge.customer.email}`);
                    doc.push({
                        id: doc.length,
                        amount: charge.amount,
                        email: charge.billing_details.email,
                        name: charge.billing_details.name,
                        payment_intent: charge.payment_intent,
                        created: charge.created,
                        status: charge.status,
                        payment_method: charge.payment_method_details.type,
                    })
                });

                res.status(200).json(doc)
            }
        );
    }
    catch (error) {

        res.status(200).json(error.message)
    }
}

export const getAllDisputes = (req, res) => {
    try {
        stripe.disputes.list().then((disputes) => {
            res.status(200).json(disputes)
        });

    }
    catch (error) {
        res.status(200).json(error.message)
    }
}

export const getBalanceTransactions = (req, res) => {
    try {

        const doc = []

        stripe.balanceTransactions.list().then((transactions) => {
            transactions?.data.forEach((transaction) => {
                console.log(transaction)
                doc.push({
                    id: doc.length,
                    type: transaction.reporting_category,
                    net: transaction.net,
                    amount: transaction.amount,
                    fee: transaction.fee,
                    description: transaction.id,
                    currency: transaction.currency,
                    cross_border_classification: transaction.cross_border_classification,
                    available_on: transaction.available_on
                })
            })
            res.status(200).json(doc)
        });
    }
    catch (error) {
        res.status(200).json(error.message)
    }
}