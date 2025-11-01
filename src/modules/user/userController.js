const { getProfileServices } = require("./userServices");


const getProfile = async (req, res) => {
    try {
        const user = await getProfileServices(req, res)
        res.json(user);
    } catch (error) {
        console.log("Error in getProfile:", error.message);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getProfile };
