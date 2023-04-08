import express from 'express'
// import { login, register, getUser } from '../controllers/general.js'
import { getUsers, getProUsers, deleteUser, getAdminUsers } from '../controllers/administrative.js'
import { getStat } from '../controllers/admin/getStat.js'
import { addRandomUsers } from '../controllers/admin/addRandomUsers.js'
import userAuth from "../middlewares/userAuth.js"
import { getDashboardInfo } from '../controllers/admin/GetDashboardInfo.js'
import { getAllPayments, getAllDisputes, getBalanceTransactions } from '../controllers/admin/getTransactions.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: "You are not supposed to be in this route" })
})

router.get('/users/', getUsers)
router.get('/users/pro', getProUsers)
router.get('/users/admins', getAdminUsers)
router.post('/deleteUser', deleteUser)
router.get('/getStat', getStat)
router.get('/addRandomUsers', addRandomUsers)
router.get('/dashboardInfo', getDashboardInfo)
router.get('/transactions', getAllPayments)
router.get('/transactions/disputes', getAllDisputes)
router.get('/transactions/all', getBalanceTransactions)

export default router