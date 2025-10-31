const jwt = require("jsonwebtoken");
const User = require("../modules/user/userModel");
 
const verifyTokenAndGetUser = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: { status: 401, message: "Unauthorized: No token found!" } };
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return { error: { status: 404, message: "User not found" } };
    }

    return { user };
  } catch (error) {
    return { error: { status: 403, message: "Invalid or expired token" } };
  }
};

module.exports = verifyTokenAndGetUser;
