import { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
    doctorInfo: {
      type: Schema.Types.ObjectId,
      ref: 'doctors',  // Reference to the 'doctors' model
      required: true,
    },
    userInfo: {
      type: Schema.Types.ObjectId,
      ref: 'users',  // Reference to the 'users' model
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = model("appointments", appointmentSchema);

export default appointmentModel;
