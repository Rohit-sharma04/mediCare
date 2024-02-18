import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModels.js";
import { deleteSlot } from "./helper.js";

export const bookAppointmnet = async (data) => {
    try {
        const { doctorId, userId, date, time,userName,doctorName } = data;
        const newAppointment = new appointmentModel({ data });
        await newAppointment.save();

        //remove choosen slot 
        const doctor = await doctorModel.findOne({ _id: doctorId }).populate('slots');

        doctor.notification.push({
            type: "New-appointment-request",
            message: `A new Appointment Request from ${userName}`,
            onCLickPath: "/user/appointments",
        });

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