import mongoose from "mongoose";
const { Schema }  = mongoose;

const reOpenRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
    },
    status: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

const ReOpenRequest = mongoose.model("reopenrequest", reOpenRequestSchema);

export default ReOpenRequest;
