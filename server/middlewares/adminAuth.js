import jwt from "jsonwebtoken"

const userAuth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token")

        if (!token)
            return res.status(403).json({ status: false, message: "Unauthorized, access denied!" })

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("🚀 ~ file: userAuth.js:11 ~ userAuth ~ verified", verified)

        if (!verified)
            return res.status(403).json({ message: "Invalid token, access denied!" })

        if (verified.user.type != 2400) return res.status(403).json({ status: false, message: "Unauthorized, access denied!" })
        next()
    }
    catch (err) {
        res.status(500).json({ status: false, message: err })
    }

}
export default userAuth