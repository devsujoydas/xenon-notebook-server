const { requestPasswordResetService, verifyOTPService, resetPasswordService } = require("./passServices");



const requestPasswordReset = async (req, res) => {
  try {
    const message = await requestPasswordResetService(req.body.email);
    res.json({ success: true, message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const message = await verifyOTPService(email, otp);
    res.json({ success: true, message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const message = await resetPasswordService(email, otp, newPassword);
    res.json({ success: true, message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



module.exports = {
  requestPasswordReset,
  verifyOTP,
  resetPassword,
};