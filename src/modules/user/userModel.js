const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true, },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true, },
    refreshToken: { type: String },
    passwordReset: {
      otp: { type: String },
      otpExpires: { type: Date },
    },
  },
  { timestamps: true }
);
 
userSchema.index({ name: "text", email: "text", role: "text" });

const User = mongoose.model("User", userSchema);
module.exports = User;
