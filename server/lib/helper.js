import { slotModel } from "../models/doctorModel.js";

const availableHoursSlots = (startTime, endTime) => {
  const slots = [];

  // Convert start and end times to Date objects for easier manipulation
  const startDate = new Date(`01/01/2021 ${startTime}`);
  const endDate = new Date(`01/01/2021 ${endTime}`);

  // Loop through the time range in 30-minute intervals
  while (startDate < endDate) {
    const currentHour = startDate.getHours();
    const currentMinute = startDate.getMinutes();

    const timeFormat = currentHour >= 12 ? 'PM' : 'AM';// Convert current time to AM/PM format
    const hour = currentHour % 12 || 12; // Convert to 12-hour format
    const minute = currentMinute === 0 ? '00' : '30'; // Round to nearest 30 minutes

    slots.push(`${hour}:${minute} ${timeFormat}`);

    startDate.setMinutes(startDate.getMinutes() + 30);
  }

  return slots;
}



export const generateSlot = (startTime, endTime) => {
  const slots = [];
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30); // Get slots for the next 30 days

  const availableHours = availableHoursSlots(startTime, endTime)
  while (startDate <= endDate) {

    const availableSlotsForDate = availableHours; // You can adjust this as per your requirements
    slots.push({
      date: startDate.toDateString(), // Create a new date instance for each slot
      availableSlots: availableSlotsForDate,
    });
    startDate.setDate(startDate.getDate() + 1); // Move to the next day
  }
  // console.log("availableHours ", "startTime ", startTime, "endTime ", endTime)
  // console.log("generated slotes", slots)
  return slots;
}


export const slotsOfTheDate = (totalSlots, date) => {
  //input date is in string formate and also contain time 
      //  console.log(totalSlots[0].date)
      // console.log(date)
  for (let slot of totalSlots) {
    if (slot.date === new Date(date).toDateString()){
      return slot.availableSlots;
    }
  }
  return []

}

export const deleteSlot =async (slots, date, time) => {
  // console.log(time)
  // console.log(date)

  for (let slot of slots) {
    if (slot.date === new Date(date).toDateString()) {
      const index = slot.availableSlots.indexOf(time);
      const slotM = await slotModel.findById(slot._id);
      if (index > -1) {
        slotM.availableSlots.splice(index, 1);
        await slotM.save(); // Save the updated slot document
        console.log("slots delete in", slotM.availableSlots);
       
      }
    }
  }
}
