const jwt = require("jsonwebtoken");
const User = require("../modules/user/userModel");

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Token expired or invalid" });
            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        res.status(401).json({ message: "Not authorized", user: null });
    }
};

module.exports = { protect };
