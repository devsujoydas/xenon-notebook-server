
const User = require("./userModel");



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

module.exports = {  getProfile };
