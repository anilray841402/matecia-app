import mongoose from "mongoose";
const { Schema } = mongoose;

const boothDesignSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    fabricatorType: {
      type: String,
    },
    fabricatorCompanyName: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    email: {
        type: String,
    },
    gst: {
        type: String,
    },
    boothDesignPath: {
        type: String,
    },
    status: {
        type: String,
    },
    reopenStatus: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const BoothDesign = mongoose.model("BoothDesign", boothDesignSchema);

export default BoothDesign;
