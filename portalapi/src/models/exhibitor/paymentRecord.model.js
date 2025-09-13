import mongoose from "mongoose";
const { Schema }  = mongoose;

const paymentRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: String,
    },
    stallPayment: {
      type: String,
    },
    brandingPayment: {
      type: String,
    },
    powerPayment: {
      type: String,
    },
    tdsDeductions: {
      type: String,
    },
    refNumber: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentRecord = mongoose.model("PaymentRecord", paymentRecordSchema);

export default PaymentRecord;
