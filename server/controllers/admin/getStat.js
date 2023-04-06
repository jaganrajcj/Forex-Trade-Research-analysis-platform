import PremiumUser from "../../models/PremiumUsers.js";
import User from "../../models/User.js"
import Transaction from "../../models/Transactions.js";

function getPercentageIncrease() {
    return new Promise((resolve, reject) => {
        // Set the date range for the previous month
        const previousMonthStart = new Date();
        previousMonthStart.setMonth(previousMonthStart.getMonth() - 1);
        previousMonthStart.setDate(1);
        previousMonthStart.setHours(0, 0, 0, 0);

        const previousMonthEnd = new Date();
        previousMonthEnd.setMonth(previousMonthEnd.getMonth() - 1);
        previousMonthEnd.setDate(0);
        previousMonthEnd.setHours(23, 59, 59, 999);

        // Count the number of users created in the previous month
        User.countDocuments({
            createdAt: {
                $gte: previousMonthStart,
                $lte: previousMonthEnd,
            },
        })
            .then(previousMonthCount => {
                // Count the total number of users
                return Promise.all([
                    previousMonthCount,
                    User.countDocuments({})
                ]);
            })
            .then(([previousMonthCount, totalCount]) => {
                // Calculate the percentage increase
                const percentageIncrease = ((previousMonthCount / totalCount) - 1) * 100;
                resolve(percentageIncrease);
                console.log(percentageIncrease)
            })
            .catch(err => {
                reject(err);
            });
    });
}

const getUserCounts = async () => {
    try {
        const totalUsers = User.countDocuments({})
        const normalUsers = User.countDocuments({ role: 'user' })
        const premiumUsers = PremiumUser.countDocuments({ isPremium: true })
        const usersIncreasePercentage = getPercentageIncrease()

        const [doc1, doc2, doc3, doc4] = await Promise.all([totalUsers, normalUsers, usersIncreasePercentage, premiumUsers])

        // return [doc1, doc2, doc3]
        return {
            totalUsers: doc1,
            normalUsers: doc2,
            premiumUsers: doc4
        }
    }
    catch (error) {
        console.log(error.message)
        return {}
    }
}

const getSales = async () => {
    try {

        const sumOfTransactions = Transaction.aggregate([
            {
                $match: { status: "success" }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ])

        const salesChartData = Transaction.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$createdAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    count: 1
                }
            }
        ])

        const [doc1, doc2] = await Promise.all([sumOfTransactions, salesChartData])
        const change = (((doc2[doc2.length - 1].count - doc2[doc2.length - 2].count) / doc2[doc2.length - 2].count) * 100).toFixed(2)

        return {
            totalRevenue: doc1[0].totalAmount,
            change,
            salesData: doc2
        }
    }
    catch (error) {
        console.log(error.message)
        return 0
    }
}

export const getStat = async (req, res) => {
    try {

        // Get all user counts with their created month
        const aggregateRes = User.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$createdAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])

        // Get all premium users count with their created month
        const premiumUsers = PremiumUser.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$createdAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    count: 1
                }
            }
        ])

        // Get total transactions

        const sumOfTransactions = Transaction.aggregate([
            {
                $match: { status: "success" }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ])

        const userStat = await getUserCounts()
        const sales = await getSales()
        const [doc1, doc2, doc3] = await Promise.all([aggregateRes, premiumUsers, sumOfTransactions])
        // console.log(doc2)

        const lastMonth = doc1[doc1.length - 1]
        const monthBeforeThat = doc1[doc1.length - 2]

        const percentage = (((lastMonth?.count - monthBeforeThat?.count) / monthBeforeThat?.count) * 100).toFixed(2)
        const premiumUserChange = (((doc2[doc2.length - 1].count - doc2[doc2.length - 2].count) / doc2[doc2.length - 2].count) * 100).toFixed(2)

        res.status(200).json({
            userStat,
            totalRevenue: doc3[0].totalAmount,
            sales,
            percChange: percentage,
            userChartData: doc1,
            premiumUsers: doc2,
            premiumUserChange: premiumUserChange
        })
    }
    catch (error) {
        console.log(error.message)
    }
}