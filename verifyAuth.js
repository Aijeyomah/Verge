const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

dotenv.config()

const verifyToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(400).send("token is not provided")
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        req.user = decoded
        if (decoded.admin_type === 'user') {
            return res.status(403).json({ message: "You arenot an admin" })
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).send("Authentication Failed")
    }
}
const verifyUserToken = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(403).json({ message: "You are not a user " })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded

        if (decoded.admin_type === 'admin') {
            return res.status(400).json({ message: "You are unauthorized user" })
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).send("Authentication Failed")
    }
}

module.exports = {
    verifyToken,
    verifyUserToken
}