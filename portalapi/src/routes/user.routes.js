import { Router } from "express";
import {
    registerUser, verifyUser, loginUser, getMe, logoutUser, forgotPassword,
    resetPassword, checkLogin, verifyToken
} from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/verify/:token").get(verifyUser);
router.route("/login").post(loginUser);
router.route("/profile").get(isLoggedIn, getMe);
router.route("/logout").get(isLoggedIn, logoutUser);
router.route("/check-login").get(isLoggedIn, checkLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.route("/verify-token").get(verifyToken);

export default router;
