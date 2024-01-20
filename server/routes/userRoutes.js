import { Router } from "express";
import {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  markReadAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  forgotPasswordController,
  verifyOTPController,
  resetPasswordController,
} from "../controllers/userCtrl.js";

import authMiddleware from "../middlewares/authMiddleware.js";

//router onject
const router = Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//APply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notifiaction  Doctor || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  markReadAllNotificationController
);
//Notifiaction  Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.post("/getAllDoctors", authMiddleware, getAllDocotrsController);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

//forgot password --generate otp
router.post("/forgot-password", forgotPasswordController);

//varify otp
router.post("/verify-otp",verifyOTPController);

router.patch("/reset-password",resetPasswordController);
export default router;
