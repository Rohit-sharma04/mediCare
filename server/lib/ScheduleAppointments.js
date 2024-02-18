import doctorModel, { slotModel } from "../models/doctorModel.js";
import { generateSlot } from "./helper.js";

export const ScheduleAppointments = async () => {
  const currentDate = new Date();
  const AllDoctors = await doctorModel.find({status: "approved"});
  console.log(AllDoctors.length)
  for (let doctor of AllDoctors) {
    // console.log(doctor);

    // Get all slots for the next 30 days
    const generatedSlots = generateSlot(doctor.timings[0], doctor.timings[1]);

    // Get existing slots for the next 30 days
    const existingSlots = await slotModel.find({
      _id: { $in: doctor.slots },
      date: { $gte: currentDate.toDateString() }, // Only consider slots from today onwards
    });

    // Find the days that are missing slots
    const missingDays = generatedSlots.slice(existingSlots.length);

    if (missingDays.length > 0) {
      // Add slots for the missing days
      const missingSlotIds = await Promise.all(
        missingDays.map((missingDay) =>
          new slotModel(missingDay).save().then((savedSlot) => savedSlot._id)
        )
      );

      // Update the doctor model with the new slots
      const updatedDoctor = await doctorModel.findByIdAndUpdate(
        doctor._id,
        { $addToSet: { slots: { $each: missingSlotIds } } },
        { new: true }
      );

      console.log(`Doctor updated with new slots: for ${doctor.firstName} ${doctor.lastName} `);
    } else {
      console.log(`Doctor already has slots for the next 30 days  for ${doctor.firstName} ${doctor.lastName}`); 
    }
  }
};
