import mongoose from "mongoose";
const { Schema }  = mongoose;

const powerOrderdSchema = new mongoose.Schema(
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

const PowerOrder = mongoose.model("PowerOrder", powerOrderdSchema);

export default PowerOrder;
