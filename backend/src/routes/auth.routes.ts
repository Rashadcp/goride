import express from "express";
import { register, login, getMe, forgotPassword, resetPassword } from "../controllers/auth.controller";
import { upload } from "../middleware/upload.middleware";
import { protect } from "../middleware/auth.middleware";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "license", maxCount: 1 },
    { name: "rc", maxCount: 1 },
    { name: "aadhaar", maxCount: 1 },
    { name: "vehiclePhoto", maxCount: 1 },
  ]),
  register
);

router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    // user should be attached by passport
    const user = req.user as any;
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    // redirect back to frontend with token
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

export default router;