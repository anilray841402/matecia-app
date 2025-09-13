import mongoose from "mongoose";
const { Schema } = mongoose;

const VendorDetailsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    additionalEmail: { type: String, default: null },
    additionalMobile: { type: String, default: null },
    address: { type: String, default: null },
    websiteUrl: { type: String, default: null },
    gstNumber: { type: String, default: null },
    type: { type: String, default: null },
    companyProfile: { type: String, default: null },
    brochureUrl: { type: String, default: null },
    imgSrc: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const VendorDetails = mongoose.model("VendorDetails", VendorDetailsSchema);

export default VendorDetails;
