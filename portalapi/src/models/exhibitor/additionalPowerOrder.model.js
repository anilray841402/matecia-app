import mongoose from "mongoose";
const { Schema }  = mongoose;

const additionalPowerOrderdSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    setUpDays: {
      type: Number,
    },
    showDays: {
      type: Number,
    },
    total: {
      type: Number,
    },
    status: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

const AdditionalPowerOrder = mongoose.model("AdditionalPowerOrder", additionalPowerOrderdSchema);

export default AdditionalPowerOrder;
