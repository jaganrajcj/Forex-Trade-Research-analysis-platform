import Transaction from "../../models/Transactions.js";
import UserInfo from "../../models/UserInfo.js";

const getTopCountries = () => {

    const result = UserInfo.aggregate([
        {
            $match: {
                location: { $exists: true }
            }
        },
        {
            $group: {
                _id: "$location",
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                count: -1
            }
        },
        {
            $limit: 10
        },
        {
            $project: {
                _id: 0,
                country: "$_id",
                count: 1
            }
        }
    ])

    return result

}

const getRecentTransactions = () => {
    const result = Transaction.aggregate([
        // Sort by descending transaction date
        { $sort: { createdAt: -1 } },

        // Limit to the 5 most recent transactions
        { $limit: 5 },

        // Lookup user information based on the userId field
        {
            $lookup: {
                from: "userinfos",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },

        // Project the desired fields from the transaction and user documents
        {
            $project: {
                _id: 0,
                amount: 1,
                date: 1,
                method: 1,
                status: 1,
                firstName: { $arrayElemAt: ["$user.firstName", 0] },
                lastName: { $arrayElemAt: ["$user.lastName", 0] },
                profileImage: { $arrayElemAt: ["$user.profileImage", 0] }
            }
        }
    ])

    return result;
}

const getSales = () => {
    const result = Transaction.aggregate([
        // Match documents within the last 12 months
        {
            $match: {
                createdAt: {
                    $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
                }
            }
        },

        // Project the year and month of each document as a date string
        {
            $project: {
                month: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$createdAt"
                    }
                },
                amount: 1
            }
        },

        // Group by month and sum the amount
        {
            $group: {
                _id: "$month",
                amount: { $sum: "$amount" }
            }
        },

        // Rename _id to month
        {
            $project: {
                _id: 0,
                month: "$_id",
                amount: 1
            }
        },

        // Sort by ascending month
        {
            $sort: {
                month: 1
            }
        }
    ])

    return result
}


export const getDashboardInfo = async (req, res) => {
    try {
        const topCountries = getTopCountries()
        const transactions = getRecentTransactions()
        const sales = getSales()

        const [doc1, doc2, doc3] = await Promise.all([topCountries, transactions, sales])

        res.status(200).json({
            topCountries: doc1,
            recentTransactions: doc2,
            sales: doc3
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}