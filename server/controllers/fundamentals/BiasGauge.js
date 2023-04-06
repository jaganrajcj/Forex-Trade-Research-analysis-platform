import Gauge from "../../models/Gauge.js";

export const getGauge = async (req, res) => {
    try {

        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
        const oneWeekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        const oneMonthAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        const threeMonthsAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));

        const gauge = await Gauge.find()
        if (!gauge) throw 'Failed to fetch gauges!'

        const result = {}

        const intraDayValues = gauge.filter(doc => doc.createdAt >= oneWeekAgo && doc.intraDay).map(doc => doc.intraDay);
        console.log(intraDayValues)
        result.intraDayAvg = intraDayValues.reduce((acc, val) => acc + val, 0) / intraDayValues.length;

        const swingValues = gauge.filter(doc => doc.createdAt >= oneWeekAgo && doc.swing).map(doc => doc.swing);
        result.swingAvg = swingValues.reduce((acc, val) => acc + val, 0) / swingValues.length;

        const positionalValues = gauge.filter(doc => doc.createdAt >= oneMonthAgo && doc.positional).map(doc => doc.positional);
        result.positionalAvg = positionalValues.reduce((acc, val) => acc + val, 0) / positionalValues.length;

        const longTermValues = gauge.filter(doc => doc.createdAt >= threeMonthsAgo && doc.longTerm).map(doc => doc.longTerm);
        result.longTermAvg = longTermValues.reduce((acc, val) => acc + val, 0) / longTermValues.length;

        res.status(200).json({ status: true, ...result })

    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
}

export const getMyGauge = async (req, res) => {
    try {
        const userId = req.userId

        const gauge = await Gauge.findOne({ userId: userId }).select(['intraDay', 'swing', 'positional', 'longTerm', '-_id'])
        if (!gauge) throw 'No gauges found for user'

        res.status(200).json({ status: true, ...gauge._doc })
    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message });

    }
}

export const updateGauge = async (req, res) => {
    try {
        const userId = req.userId
        const { intraDay, swing, positional, longTerm } = req.body
        // console.log(req.body)

        let gauge = await Gauge.findOne({ "userId": userId })

        if (!gauge) gauge = new Gauge({
            'userId': userId,
            'intraDay': intraDay,
            'swing': swing,
            'positional': positional,
            'longTerm': longTerm
        })
        else {
            gauge.intraDay = intraDay
            gauge.swing = swing
            gauge.positional = positional
            gauge.longTerm = longTerm
        }

        gauge.save()
            .then(() => {
                res.status(200).json({ status: true, message: 'New votes saved successfully' })
            })
            .catch((err) => {
                throw err
            })
    }
    catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
}