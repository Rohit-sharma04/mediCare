import { Router } from "express";
import { getAllUsersController, getAllDoctorsController, changeAccountStatusController, deleteDoctorAccountController } from "../controllers/adminCtrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";

const router = Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  // adminAuthMiddleware,
  changeAccountStatusController
);

// delete doctor account
router.post(
  "/deleteDoctorAccount",
  //  adminAuthMiddleware,
  deleteDoctorAccountController
);
 
export default router;
