const { signUpUserService, signInUserService, logOutUserService, refreshAccessTokenService, } = require("./authServices");


const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await signUpUserService(name, email, password, res);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await signInUserService(email, password, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signInWithGoogle = async (req, res) => {
  try {
    const formData = req.body;
    let user = await userModel.findOne({ email: formData.email });
    if (!user) user = await userModel.create(formData);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

const logOutUser = (req, res) => {
  try {
    // console.log("clicked for logged out")
    logOutUserService(req, res);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshAccessToken = (req, res) => {
  try {
    const result = refreshAccessTokenService(req, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  signUpUser,
  signInUser,
  signInWithGoogle,
  logOutUser,
  refreshAccessToken,
};








