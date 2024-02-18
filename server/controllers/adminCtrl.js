import { generateSlot } from "../lib/helper.js";
import doctorModel, { slotModel } from "../models/doctorModel.js";
import userModel from "../models/userModels.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

// doctor account status
export const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, userIdofDoctor,status, timeFrom, timeTo } = req.body;
    console.log("doctor record", doctorId, status, timeFrom, timeTo)

    const generatedSlots = generateSlot(timeFrom, timeTo);
    const slotIds = await Promise.all(generatedSlots.map(slot => new slotModel(slot).save().then(savedSlot => savedSlot._id)));


    const doctor = await doctorModel.updateOne({_id:doctorId}, { status, slots: slotIds });
    console.log("doc",doctor)
    const user = await userModel.findOne({ _id: userIdofDoctor });
   console.log("user",user)

    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();

    //when doctor is apporoved


    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};


export const deleteDoctorAccountController = async (req, res) => {
  try {
    const { doctorId ,userIdofDoctor} = req.body;
    console.log("userId",userIdofDoctor)
    console.log("delete req",req.body)
    const doc=await doctorModel.deleteOne({_id:doctorId });
   console.log(doc) 
    const user = await userModel.findOne({ _id: userIdofDoctor });
    console.log("user",user)  
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request is rejected `,
      onClickPath: "/notification",
    });
    user.isDoctor = false;
    await user.save();

    res.status(201).send({
      success: true,
      message: "Account Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
}

