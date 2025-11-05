const User = require("./userModel");

const getProfileServices = (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user;
    return user
}

const updateUserProfileServices = async (req, res) => {
    const userId = req.user._id;
    const { name, phone } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, phone: phone || "" },
        { new: true, runValidators: true }
    );

    return updatedUser
}


const updateAddressService = async (user, addressData) => {
    user.addressInfo = addressData;
    await user.save();
    return user.addressInfo;
};

module.exports = {
    getProfileServices,
    updateAddressService,
    updateUserProfileServices
};