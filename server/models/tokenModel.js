import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String, 
    required:true,
  },
  expireAt: { type: Date,  expires: 120 }  //120 sec or 2 min
});

const tokenModel = model("tokens", tokenSchema);

export default tokenModel;
