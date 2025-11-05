const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  { 
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    phone: { type: String, trim: true, default: "" },
    profileImg: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true },
    
    password: { type: String, required: true, minlength: 6 },
    passwordReset: {
      token: { type: String },
      expires: { type: Date },
    },
    
    addressInfo: {
      address: { type: String, trim: true, default: "" },
      city: { type: String, trim: true, default: "" },
      state: { type: String, trim: true, default: "" },
      postalCode: { type: String, trim: true, default: "" },
      country: { type: String, trim: true, default: "" },
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

 
userSchema.index({ name: "text", email: "text", role: "text" });

const User = mongoose.model("User", userSchema);
module.exports = User;
