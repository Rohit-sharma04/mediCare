import { Router } from "express";
import { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController } from "../controllers/doctorCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddleware,getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE DOC INFO
router.post("/getDoctorById",  getDoctorByIdController);

//GET Appointments
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);


//update doctor profile
router.patch("/update-profile", authMiddleware, updateProfileController);

export default router;
