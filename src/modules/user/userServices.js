
const getProfileServices = (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user;
    return user
}


module.exports = {
    getProfileServices
};