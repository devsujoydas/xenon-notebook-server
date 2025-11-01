const sendEmail = require("../../utils/sendEmail");
const bcrypt = require("bcryptjs"); 
const User = require("../user/userModel");

const requestPasswordResetService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOTP = await bcrypt.hash(otp, 10);

  user.passwordReset = {
    otp: hashedOTP,
    otpExpires: Date.now() + 10 * 60 * 1000,
  };
  await user.save();

  await sendEmail(
    email,
    "🔐 Password Reset - One Time Passcode (OTP)",
    `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: #4B1E2F; color: #fff; padding: 16px; text-align: center;">
      <h1 style="margin: 0; font-size: 20px;">Password Reset Verification</h1>
    </div>
    <div style="padding: 24px;">
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 15px; color: #555;">
        We received a request to reset your password. Use the following One Time Passcode (OTP) to proceed:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; background: #f4f4f4; padding: 14px 28px; font-size: 28px; font-weight: bold; letter-spacing: 6px; border-radius: 6px; border: 1px solid #ddd; color: #4B1E2F;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 14px; color: #777;">
        ⚠️ This OTP will expire in <strong>10 minutes</strong>. Please do not share it with anyone.
      </p>
      <p style="font-size: 14px; color: #777;">
        If you didn’t request this, you can safely ignore this email.
      </p>
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} Xenon-Notebook All rights reserved.
      </p>
    </div>
  </div>
  `
  );
  return "OTP sent to your email";
};



const verifyOTPService = async (email, otp) => {
  const user = await User.findOne({ email });
  if (!user || !user.passwordReset?.otp) throw new Error("No OTP found");

  if (user.passwordReset.otpExpires < Date.now()) throw new Error("OTP expired");

  const isMatch = await bcrypt.compare(otp, user.passwordReset.otp);
  if (!isMatch) throw new Error("Invalid OTP");

  return "OTP verified successfully";
};



const resetPasswordService = async (email, otp, newPassword) => {
  const user = await User.findOne({ email });
  if (!user || !user.passwordReset?.otp) throw new Error("No OTP found");

  if (user.passwordReset.otpExpires < Date.now()) throw new Error("OTP expired");

  const isMatch = await bcrypt.compare(otp, user.passwordReset.otp);
  if (!isMatch) throw new Error("Invalid OTP");

  user.password = await bcrypt.hash(newPassword, 10);
  user.passwordReset = {}; 
  await user.save();

  return "Password reset successful";
};



module.exports = { 
  requestPasswordResetService,
  verifyOTPService,
  resetPasswordService,
};