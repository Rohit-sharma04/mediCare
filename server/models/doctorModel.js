import { Schema, model } from "mongoose";

const slotSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  availableSlots: {
    type: [String], // Assuming each slot is represented as a string (e.g., "10:30 AM")
    default: [],
  },
  // expireAt: { type: Date,  expires: 11 } 
});

const doctorSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is require"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    feesPerCunsaltation: {
      type: Number,
      required: [true, "fee is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "wrok timing is required"],
    },
    slots: [{ type: Schema.Types.ObjectId, ref: 'slots' }], // Add the slots section with the slotSchema
  },
  { timestamps: true }
);

export const slotModel= model("slots",slotSchema);
const doctorModel = model("doctors", doctorSchema);
export default doctorModel;
