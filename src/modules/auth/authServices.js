const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createTokens = require("../../utils/createTokens");
const User = require("../user/userModel");
const { JWT_SECRET } = require("../../config/configs");


const signUpUserService = async (name, email, password, res) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  console.log(user)

  const accessToken = createTokens(res, user._id);

  return {
    message: "User registered successfully",
    user: { _id: user._id, name: user.name, email: user.email },
    accessToken,
  };
};

const signInUserService = async (email, password, res) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = createTokens(res, user._id);

  return {
    message: "Login successful",
    user: { _id: user._id, name: user.name, email: user.email },
    accessToken,
  };
};

const logOutUserService = (res) => {
  res.clearCookie("refreshToken");
};

const refreshAccessTokenService = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) throw new Error("No refresh token found");

  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) throw new Error("Invalid refresh token");
    const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: "15m" });
    res.json({ accessToken: newAccessToken });
  });
};


module.exports = {
  signUpUserService,
  signInUserService,
  logOutUserService,
  refreshAccessTokenService,
};
