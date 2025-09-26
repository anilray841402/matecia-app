import { PaymentRecord } from "../../models/exhibitor/index.js";

const submitPaymentrecord = async (req, res) => {
  const { date, stallPayment, brandingPayment, powerPayment, tdsDeductions, refNumber, remarks } = req.body;

    if (!date || typeof date !== "string" ||
        !remarks || typeof remarks !== "string") {
       return res.status(400).json({
        success: false,
        message: "All fields are required and must be valid strings.",
      });
  }
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const paymentRecords = await PaymentRecord.create({ userId, date, stallPayment, brandingPayment, powerPayment, tdsDeductions, refNumber, remarks });
    if (!paymentRecords) {
      return res.status(404).json({
        success: false,
        message: "Data not submited here",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data submited successfully",
      data: paymentRecords,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while submiting data",
      error: error.message,
    });
  }

};

export default submitPaymentrecord;
