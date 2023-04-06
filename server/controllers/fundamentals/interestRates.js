import InterestRates from "../../models/InterestRates.js"
import axios from 'axios'

export const updateInterestRates = async (req, res) => {
    try {
        const rateResults = await axios.get('https://api.api-ninjas.com/v1/interestrate',
            {
                headers: {
                    'X-Api-Key': process.env.API_NINJA_API_KEY,
                    'central_bank_only': true
                }
            }
        )

        if (!rateResults.data) throw ("Error fetching rates!")
        const centralBankRates = rateResults.data.central_bank_rates

        const currentDate = new Date();
        const year = currentDate.getFullYear().toString();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const getInterestRate = (country) => {
            for (let i = 0; i < centralBankRates.length; i++) {
                if (centralBankRates[i].country === country) {
                    return centralBankRates[i].rate_pct;
                }
            }
            return 0
        }

        const newRates = new InterestRates({
            date: formattedDate,
            usd: {
                rate: getInterestRate("United States")
            },
            gbp: {
                rate: getInterestRate("Great Britain")
            },
            eur: {
                rate: getInterestRate("Europe")
            },
            jpy: {
                rate: getInterestRate("Japan")
            },
            chf: {
                rate: getInterestRate("Switzerland")
            },
            cad: {
                rate: getInterestRate("Canada")
            },
            aud: {
                rate: getInterestRate("Australia")
            },
            nzd: {
                rate: getInterestRate("New Zealand")
            }
        })

        newRates.save()
            .then((result) => {
                if (result) res.status(200).json({ status: true, message: "Rates updated successfully" })
                else throw ("Error updating rates!")
            })
            .catch((err) => {
                console.log('Error updating rates', err.message)
                throw ("Error updating rates!")
            })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: false, message: err.message })
    }
}

// 
export const fetchInterestRates = async (req, res) => {
    try {
        const market = req.query.market
        if (!market) return res.status(404).json({ status: false, message: 'Provide a Forex pair name!' })

        const validMarketNames = ["EURUSD", "GBPUSD", "USDJPY", "USDCHF", "USDCAD", "AUDUSD", "NZDUSD", "EURGBP", "EURAUD", "GBPJPY", "CHFJPY", "NZDJPY", "GBPCAD"]
        if (!validMarketNames.includes(market.toUpperCase()))
            return res.status(404).json({
                status: false,
                message: 'The given pair is not currently supported!',
                supportedPairs: validMarketNames
            })

        const baseCurrency = market.substring(0, 3).toLowerCase(); // get the first three characters as the base currency
        const quoteCurrency = market.substring(3, 6).toLowerCase(); // get the last three characters as the quote currency

        const rates = await InterestRates.findOne({ sort: { _id: -1 }, limit: 1 }).select([baseCurrency, quoteCurrency, '-_id'])

        if (!rates) throw ("Failed to get rates for the given currency pair!")

        res.status(200).json({ status: true, ...rates._doc })

    }
    catch (err) {
        console.log("Error fetching interest rates", err.message)
        res.status(500).json({ status: false, message: err.message })
    }
}