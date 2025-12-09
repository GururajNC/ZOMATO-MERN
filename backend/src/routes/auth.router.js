import express from "express"
import authController from "../controller/auth.controller.js";

const router =  express.Router();

router.post("/user/register",authController.registerUser)
router.post("/user/login",authController.loginUser)
router.get("/user/logout",authController.logoutUser) 
router.post("/foodpartner/register",authController.foodPartnerRegister)
router.post("/foodpartner/login",authController.foodPartnerLogin)
router.get("/foodpartner/logout",authController.foodPartnerLogout)

export default router;
