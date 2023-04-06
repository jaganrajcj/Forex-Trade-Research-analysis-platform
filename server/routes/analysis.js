import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import adminAuth from '../middlewares/adminAuth.js'
import { fetchAnalysis } from '../controllers/analysis.js'
import { updateCOT, uploadCOTFile, fetchCOTData, } from '../controllers/fundamentalAnalysis.js'
import { updateInterestRates, fetchInterestRates } from '../controllers/fundamentals/interestRates.js'
import { getGauge, getMyGauge, updateGauge } from '../controllers/fundamentals/BiasGauge.js'

const router = express.Router()

router.get('/', userAuth, (req, res) => {
    res.status(200).json({})
})

router.get('/fundamental', userAuth, (req, res) => {
    res.status(200).json({ message: 'please provide more context!' })

})

// router.get('/fundamental/:market', userAuth, fetchAnalysis)
router.get('/fundamental/cot', userAuth, fetchCOTData)
router.post('/fundamental/cot/update', uploadCOTFile.single('cotFile'), updateCOT)

router.get('/fundamental/interest-rates/update', adminAuth, updateInterestRates)
router.get('/fundamental/interest-rates', userAuth, fetchInterestRates)

router.get('/fundamental/gauge', userAuth, getGauge)
router.get('/fundamental/gauge/mine', userAuth, getMyGauge)
router.post('/fundamental/gauge/update', userAuth, updateGauge)


export default router