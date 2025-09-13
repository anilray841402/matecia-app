import mongoose from "mongoose";
const { Schema } = mongoose;

const exhibitorDetailSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    piNumber: { type: String, required: true },
    companyName: { type: String, required: true },
    brandName: { type: String, required: true },
    boothNumber: { type: String, required: true }, // Keep only one
    stallSize: { type: Number, required: true },
    standType: { type: String, required: true },
    hallNumber: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    additionalEmail: { type: String, default: null },
    additionalMobile: { type: String, default: null },
    address: { type: String, default: null },
    websiteUrl: { type: String, default: null },
    gstNumber: { type: String, default: null },
    paymentStatus: { type: String, default: null },
    noc: { type: Number, default: 0 },
    pc: { type: Number, default: 0 },
    companyProfile: { type: String, default: null },
    imgSrc: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const ExhibitorDetails = mongoose.model("ExhibitorDetails", exhibitorDetailSchema);

export default ExhibitorDetails;
