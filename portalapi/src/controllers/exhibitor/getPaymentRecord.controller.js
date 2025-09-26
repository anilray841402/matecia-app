import { PaymentRecord } from "../../models/exhibitor/index.js";
import mongoose from "mongoose";

const getPaymentRecord = async (req, res) => {
  const userId = req.user.id;
 
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const paymentRecordById = await PaymentRecord.find({ userId: objectUserId });

    if (!paymentRecordById) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: paymentRecordById,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching data",
      error: error.message,
    });
  }

};

export default getPaymentRecord;
