const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./userModel");

const createToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        createToken(res, user._id);

        res.status(201).json({
            user: { _id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ errormessage: error.message });
    }
};

const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        createToken(res, user._id);

        res.json({ user: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logoutUser = (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    res.json({ message: "Logged out successfully" });
};

const getProfile = async (req, res) => {
    try {
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        console.log("Error in getProfile:", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, signinUser, logoutUser, getProfile };
