import { Router } from "express";
import { createCheckoutSessionController } from "../controllers/paymentCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-checkout-session",authMiddleware, createCheckoutSessionController);
 
export default router; 