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

  const { accessToken, refreshToken } = createTokens(res, user);

  user.refreshToken = refreshToken;
  await user.save();

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

  const { accessToken, refreshToken } = createTokens(res, user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    message: "Login successful",
    user: { _id: user._id, name: user.name, email: user.email },
    accessToken,
  };
};


const logOutUserService = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    res.clearCookie("refreshToken");
    return;
  }

  const user = await User.findOne({ refreshToken });
  
  if (!user) {
    res.clearCookie("refreshToken");
    return;
  }

  user.refreshToken = null;
  await user.save();

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
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
