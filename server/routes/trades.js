import express from 'express'
import { getTrades, newTrade, deleteTrade, updateTrade, getTradeSummary, getOverviewChartData } from '../controllers/trades.js'
import userAuth from '../middlewares/userAuth.js'

const router = express.Router()

router.get('/', userAuth, getTrades)
router.get('/summary', userAuth, getTradeSummary)
router.get('/overview-chart', userAuth, getOverviewChartData)
router.get('/delete-trade/:id', userAuth, deleteTrade)

router.post('/new', userAuth, newTrade)
router.post('/update-trade/:id', userAuth, updateTrade)

export default router