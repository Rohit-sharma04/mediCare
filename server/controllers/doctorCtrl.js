import { handleUpload } from "../config/cloudinary.js";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModels.js";

export const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

//update user profile 
export const updateProfileController = async (req, res) => {
  try {
    console.log(req.body)

    if (req.body.profilePic) {
      const cloudImage = await handleUpload(req.body.profilePic);
      console.log(cloudImage.url)
      req.body.profilePic = cloudImage.url;
    }

    const { name, userId, profilePic = '' } = req.body;
   const doctor= await doctorModel.updateOne({userId }, { $set: {...req.body } }); 
  // const doctor=await doctorModel.findOne({userId})
   console.log(doctor)

    res.status(200).send({
      success: true,
      message: 'Updated successfully'
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: 'Error something went wrong'
    });
  }
}

//get single docotor
export const getDoctorByIdController = async (req, res) => {
  try {
    console.log("doctor id = ",req.body)
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Sigle Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docot info",
    });
  }
};

export const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};




