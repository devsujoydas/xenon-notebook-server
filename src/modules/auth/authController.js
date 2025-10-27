const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/userModel");

// 🔹 Token Creator
const createTokens = (res, userId) => {
    const accessToken = jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    // Refresh token cookie set করা হচ্ছে
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS এ true হবে
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return accessToken;
};



const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const accessToken = createTokens(res, user._id);

        res.status(201).json({
            message: "User registered successfully",
            user: { _id: user._id, name: user.name, email: user.email },
            accessToken,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};


const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });

        const accessToken = createTokens(res, user._id);

        res.json({
            message: "Login successful",
            user: { _id: user._id, name: user.name, email: user.email },
            accessToken,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const logOutUser = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
};

const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ accessToken: newAccessToken });
    });
};


module.exports = { signUpUser, signInUser, logOutUser, refreshAccessToken }