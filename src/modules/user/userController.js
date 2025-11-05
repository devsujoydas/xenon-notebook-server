
const {
    getProfileServices, updateAddress,
    updateAddressService,
    updateUserProfileServices,
} = require("./userServices");


const getProfile = async (req, res) => {
    try {
        const user = getProfileServices(req, res)
        return res.json(user);
    } catch (error) {
        console.log("Error in getProfile:", error.message);
        res.status(500).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const updatedUser =await  updateUserProfileServices(req, res)

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const updateUserAddress = async (req, res) => {
    try {
        const updatedAddress = await updateAddressService(req.user, req.body);
        res.status(200).json({
            message: "Address updated successfully",
            address: updatedAddress,
        });
    } catch (err) {
        console.error("Update Address Error:", err);
        res.status(500).json({ message: err.message || "Server Error" });
    }
};



module.exports = { getProfile, updateUserProfile, updateUserAddress };


