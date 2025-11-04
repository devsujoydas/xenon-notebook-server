const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true, },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true, },
    password: { type: String, required: true, minlength: 6 },
    refreshToken: { type: String },
    passwordReset: {
      token: { type: String },
      expires: { type: Date },
    },

  },
  { timestamps: true }
);

userSchema.index({ name: "text", email: "text", role: "text" });

const User = mongoose.model("User", userSchema);
module.exports = User;
