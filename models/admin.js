import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const adminSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    collection: "admins",
  }
);
const Admin = model("Admin", adminSchema);
export default Admin;
