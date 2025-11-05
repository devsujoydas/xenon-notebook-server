const express = require("express");
const router = express.Router();

const {
  requestPasswordReset,
  verifyResetToken,
  resetPassword,
  changePassword,
} = require("./passController");
const isVerifyUser = require("../../Middleware/isVerifyUser");

 
router.post("/forgot-password", requestPasswordReset);
router.get("/reset-password", verifyResetToken);
router.post("/reset-password", resetPassword);

router.put("/change-password", isVerifyUser, changePassword)


module.exports = router;
