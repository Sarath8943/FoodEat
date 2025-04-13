// routes/auth.js
const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  resetPassword,
  logout,
  profileUpdate,
  checkUser,
  deleteUserAccount,
  getUsers,
} = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/reset-password", authMiddleware, resetPassword); // Fixed typo from "rest" to "reset"
router.post("/logout", logout);
router.put("/update-profile", authMiddleware, profileUpdate);
router.delete("/delete-account", authMiddleware, deleteUserAccount);
router.get("/check-user", authMiddleware, checkUser);
router.get("/get-users", getUsers);

module.exports = router;
