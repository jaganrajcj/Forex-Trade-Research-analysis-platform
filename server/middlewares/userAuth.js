import jwt from "jsonwebtoken"

const userAuth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token")

        if (!token)
            return res.status(403).json({ message: "Invalid token, access denied!" })

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("🚀 ~ file: userAuth.js:11 ~ userAuth ~ verified", verified)

        if (!verified)
            return res.status(403).json({ message: "Unauthorized, access denied!" })

        req.userId = verified.user.id
        next()
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}
export default userAuth