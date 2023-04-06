import UserInfo from "../../models/UserInfo.js";



const getTopCountries = () => {
    try {
        const result = UserInfo.aggregate([
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
    catch (error) {
        console.log(error);
        return []
    }
}


export const getDashboardInfo = async (req, res) => {
    try {
        const topCountries = getTopCountries()

        const [doc1] = await Promise.all([topCountries])

        res.status(200).json({
            topCountries: doc1
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}