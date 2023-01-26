import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    collection: "categories",
  }
);

const category = model("category", categorySchema);
export default category;
