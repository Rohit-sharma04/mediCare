import moment from "moment";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModels.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { deleteSlot, slotsOfTheDate } from "../lib/helper.js";
import { handleUpload } from "../config/cloudinary.js";
import tokenModel from "../models/tokenModel.js";
import { sendEmail } from "../config/email.js";

//register callback
export const registerController = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.body.email)

    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    let cloudinaryImg = "";
    if (req.body.profilePic) {
      const cloudImage = await handleUpload(req.body.profilePic);
      console.log(cloudImage.url)
      cloudinaryImg = cloudImage.url;
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    req.body.profilePic = cloudinaryImg;

    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log("errrrrrrr", error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
export const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }

    const token = jwt.sign({ id: user._id, userName: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

//get user data
export const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });

    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      user.password = undefined;
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// Appply DOctor CTRL
export const applyDoctorController = async (req, res) => {
  try {
    console.log("apply doctor", req.body)

    if (req.body.profilePic) {
      const cloudImage = await handleUpload(req.body.profilePic);
      console.log(cloudImage.url)
      req.body.profilePic = cloudImage.url;
    }


    if (req.body.certificates.length) {
      const certificate = [];
      for (let certi of req.body.certificates) {
        const cloudImage = await handleUpload(certi);
        console.log(cloudImage.url)
        certificate.push(cloudImage.url)
      }
      req.body.certificates = certificate;
    }

    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    console.log(newDoctor)
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

//notification ctrl mark all notification seen
export const markReadAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = seennotification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// delete notifications
export const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

//GET ALL DOC
export const getAllDocotrsController = async (req, res) => {
  try {

    // const nameRegex = new RegExp(req.body.searchText)
    const doctors = await doctorModel.find({
      firstName: new RegExp(req.body.firstName, 'i'),
      lastName: new RegExp(req.body.lastName, 'i'),
      specialization: new RegExp(req.body.specialization, "i"),
      status: "approved"
    });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
    });
  }
};

//BOOK APPOINTMENT
export const bookeAppointmnetController = async (req, res) => {
  try {
    const date = req.body.date;
    const time = req.body.time;
    console.log("date", date)
    console.log("time", time)

    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    //userId of doctor
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    //remove choosen slot 
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId }).populate('slots');

    await deleteSlot(doctor.slots, date, time)

    /** these steps are not needed */
    //  const slotIds = doctor.slots.map(slot => slot._id);
    //  doctor.slots=slotIds;
    //  await doctor.save();

    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
      session
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

// booking bookingAvailabilityController
export const bookingAvailabilityController = async (req, res) => {
  try {
    const date = req.body.date;
    const doctorId = req.body.doctorId;

    const doctor = await doctorModel.findOne({ _id: doctorId }).populate('slots');

    const availableSlots = slotsOfTheDate(doctor.slots, date);
    console.log("available slot of the date", availableSlots)

    if (availableSlots.length > 0) {
      return res.status(200).send({
        availableSlots,
        success: true,
        message: "Slots Available",
      });
    } else {
      return res.status(200).send({
        message: "No Available slote on this date",
        success: true,
      });

    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

//user appointment list
export const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({userId: req.body.userId});
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

//check user existance and generate  OTP and save in token model
export const forgotPasswordController = async (req, res) => {
  try {
    console.log(req.body.email)
    let userData = await userModel.findOne({ email: req.body.email });
    if (userData) {

      // delete previous token
      const prevToken = await tokenModel.findOne({ email: userData.email })
      if (prevToken) {
        await tokenModel.deleteOne({ email: userData.email })
      }

      // generate otp and save it in the database
      const token = Math.random().toString(36).substring(2, 8); //string of size 6

      const salt = await bcrypt.genSalt(10);
      const hashedToken = await bcrypt.hash(token, salt);
      const tokenDocument = new tokenModel({ email: userData.email, token: hashedToken });
      await tokenDocument.save();
      console.log("token", token)

      try {
        console.log(userData.email)
        await sendEmail(userData.email, token);
        console.log("hashedtoken", hashedToken)
        return res.status(200).send({
          success: true,
          message: "user Found",
        });
      }
      catch (error) {
        tokenDocument.token = undefined
        await tokenDocument.save({ validateBeforeSave: false });
        console.log(error)
        res.status(500).send({
          success: false,
          error,
          message: "Error Occured",
        });
      }


    }
    else {
      return res.status(200).send({
        success: false,
        message: "User Not Found",
      });
    }

  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error Occured",
    });
  }
}

//verify otp from tokenModel
export const verifyOTPController = async (req, res) => {
  try {

    const tokenDocument = await tokenModel.findOne({ email: req.body.email })
    console.log(tokenDocument)
    const isMatch = await bcrypt.compare(req.body.otp, tokenDocument.token);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invlid OTP",
        success: false
      });
    }
    //delete the user's token after verification
    await tokenModel.deleteOne({ _id: tokenDocument._id });
    // Update the flag when OTP is successfully verified
    await userModel.updateOne({ email: req.email }, { $set: { otpVerified: true } });
    res.status(200).send({
      success: true,
      message: "OTP matched sucessfully",
    });
  }

  catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error Occured",
    });
    console.log(error)
  }

}

// reset password
export const resetPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the password in the database
    await userModel.updateOne({ email }, { $set: { password: hashedPassword } });
    res.status(200).send({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: 'Error resetting password'
    });
  }
}

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
    const user = await userModel.updateOne({ _id: userId }, { $set: { name: name, profilePic: profilePic } });
    console.log(user)
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
