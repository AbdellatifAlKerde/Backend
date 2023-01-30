import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },
  {
    collection: "products",
    timestamps: true,
  }
);
productSchema.pre(["find", "findone"], function () {
  this.populate(["category"]);
});
const product = model("product", productSchema);
export default product;
