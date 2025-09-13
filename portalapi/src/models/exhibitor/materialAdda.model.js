import mongoose from "mongoose";
const { Schema } = mongoose;

const materialAddaSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    innovationType: {
      type: String,
      required: true,
    },
    productInnovation: {
      type: String,
      required: true,
    },
    productSuperior: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    products: [
      {
        productName: {
          type: String,
          required: false, // Changed to false, since not all products may be filled
        },
        productDescription: {
          type: String,
          required: false, // Changed to false, for optional entry
        },
        productDimension: {
          type: String,
          required: false, // Changed to false, for optional entry
        },
        productImg: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MaterialAdda = mongoose.model("MaterialAdda", materialAddaSchema);

export default MaterialAdda;
