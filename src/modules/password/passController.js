const {
  requestPasswordResetService,
  verifyResetTokenService,
  resetPasswordService,
  changeUserPasswordService
} = require('./passServices');

const requestPasswordReset = async (req, res) => {
  try {
    const message = await requestPasswordResetService(req.body.email);
    res.json({ success: true, message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.query
    if (!token) throw new Error('Token missing');
    const message = await verifyResetTokenService(token);
    res.json({ success: true, message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query
    const { newPassword, confirmNewPassword } = req.body;

    const message = await resetPasswordService(token, newPassword, confirmNewPassword);
    res.json({ success: true, message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Both passwords are required" });

    const message = await changeUserPasswordService(req.user._id, oldPassword, newPassword);
    res.status(200).json({ message });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(400).json({ message: err.message || "Server Error" });
  }
};

module.exports = { requestPasswordReset, verifyResetToken, resetPassword, changePassword };
