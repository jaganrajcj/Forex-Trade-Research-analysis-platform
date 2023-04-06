import express from 'express'
// import { login, register, getUser } from '../controllers/general.js'
import { getUsers, deleteUser } from '../controllers/administrative.js'
import { getStat } from '../controllers/admin/getStat.js'
import { addRandomUsers } from '../controllers/admin/addRandomUsers.js'
import userAuth from "../middlewares/userAuth.js"
import { getDashboardInfo } from '../controllers/admin/GetDashboardInfo.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: "You are not supposed to be in this route" })
})

router.get('/users/', getUsers)
router.post('/deleteUser', deleteUser)
router.get('/getStat', getStat)
router.get('/addRandomUsers', addRandomUsers)
router.get('/dashboardInfo', getDashboardInfo)

export default router