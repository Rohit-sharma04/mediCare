import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModels.js";
import { deleteSlot } from "./helper.js";

export const bookAppointmnet = async (data) => {
    try {
        const { doctorId, userId, date, time,userName,doctorName } = data;
        const newAppointment = new appointmentModel({ doctorId, userId, date, 
            time,userName,doctorName });
            
        await newAppointment.save();

        const doctor = await doctorModel.findOne({ _id: doctorId }).populate('slots');

        //userId of doctor
        const user = await userModel.findOne({ _id: doctor.userId });
        user.notification.push({
          type: "New-appointment-request",
          message: `A new Appointment Request from ${userName}`,
          onCLickPath: "/user/appointments",
        });
        await user.save();
        //remove choosen slot 
    
        await deleteSlot(doctor.slots, date, time)
        await doctor.save();
        /** these steps are not needed */
        //  const slotIds = doctor.slots.map(slot => slot._id);
        //  doctor.slots=slotIds;
        //  await doctor.save();
    } catch (error) {
        console.log(error);
    }
};