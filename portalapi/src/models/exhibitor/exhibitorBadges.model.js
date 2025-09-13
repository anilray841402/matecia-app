import mongoose from "mongoose";
const { Schema } = mongoose;

const exhibitorBadgesSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ExhibitorBadges = mongoose.model("ExhibitorBadges", exhibitorBadgesSchema);

export default ExhibitorBadges;
