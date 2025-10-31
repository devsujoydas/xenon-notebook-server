const { JWT_SECRET } = require("../config/configs");

const createTokens = (res, userId) => {
    const accessToken = jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return accessToken;
};

module.exports = createTokens;