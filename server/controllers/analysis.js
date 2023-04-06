export const fetchAnalysis = async (req, res) => {

    try {
        const { market } = req.params

        res.status(200).json({ status: true, message: `analysis for ${market}` })

    }
    catch (err) {
        console.log('Error from fetchAnalysis', err.message)
        res.status(403).json({ status: false, message: `Error occurred while fetching analysis data for ${market}` })
    }

}