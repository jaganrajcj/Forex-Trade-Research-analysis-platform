import { v4 as uuidv4 } from 'uuid';
import multer from "multer"
import path from "path"
import fs from 'fs'
import csv from 'csv-parser'
import COT from '../models/COT.js'
import commodityNamePair from '../utils/commodityNamePair.js'

// COT methods
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/cot');
    },
    filename: function (req, file, cb) {
        const imagePath = uuidv4() + '-' + Date.now() + path.extname(file.originalname)
        // console.log("Req: ", req.body)
        cb(null, imagePath);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['text/csv'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
export const uploadCOTFile = multer({ storage, fileFilter });

export const updateCOT = async (req, res) => {
    try {
        const cotFile = req.file.filename
        const token = req.header("x-auth-token")

        const currentDate = new Date();
        const year = currentDate.getFullYear().toString();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const results = [];
        fs.createReadStream(`../server/data/cot/${cotFile}`)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data);
            })
            .on('end', () => {
                results.pop()

                const newCOTData = new COT({
                    date: formattedDate,
                    commitMentData: results
                })

                newCOTData.save()

                console.log(results);
            });

        res.status(200).json({ status: true, message: cotFile })

    }
    catch (err) {
        console.log(err)
        res.status(403).json({ status: false, message: "Failed to update COT data!" })
    }
}

export const fetchCOTData = async (req, res) => {
    try {
        const market = req.query.market
        if (!market) return res.status(404).json({ status: false, message: 'Provide a forex pair name!' })

        const validMarketNames = ["EURUSD", "GBPUSD", "USDJPY", "USDCHF", "USDCAD", "AUDUSD", "NZDUSD", "EURGBP", "EURAUD", "GBPJPY", "CHFJPY", "NZDJPY", "GBPCAD"]

        if (!validMarketNames.includes(market.toUpperCase()))
            return res.status(404).json({
                status: false,
                message: 'The given pair is not currently supported!',
                supportedPairs: validMarketNames
            })

        const baseCurrency = market.substring(0, 3); // get the first three characters as the base currency
        const quoteCurrency = market.substring(3, 6); // get the last three characters as the quote currency

        const cotData = await COT.findOne({ sort: { _id: -1 }, limit: 1 }).select(['-_id', '-createdAt', '-updatedAt', '-__v'])

        const baseCurrencyName = commodityNamePair.find(pair => pair.shortHand === baseCurrency).name
        const quoteCurrencyName = commodityNamePair.find(pair => pair.shortHand === quoteCurrency).name

        if (!baseCurrencyName || !quoteCurrencyName) throw 'Invalid base or quote currency'

        const baseCurrencyCotData = cotData.commitMentData.find(data => data.Commodity === baseCurrencyName)
        const quoteCurrencyCotData = cotData.commitMentData.find(data => data.Commodity === quoteCurrencyName)

        if (!baseCurrencyCotData || !quoteCurrencyCotData) throw `Failed to fetch COT data of ${!baseCurrencyCotData ? baseCurrencyName : quoteCurrencyName}`

        res.status(200).json({ baseCurrencyData: baseCurrencyCotData, quoteCurrencyData: quoteCurrencyCotData })
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ status: false, message: err.message })
    }
}