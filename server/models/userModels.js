import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  profilePic:{
    type:String,
    default:"",
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
});

const userModel = model("users", userSchema);

export default userModel;
