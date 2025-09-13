import { PaymentRecord } from "../../models/exhibitor/index.js";

const updatePaymentRecord = async (req, res) => {

  const badgeId = req.params.id;

  const { date, stallPayment, brandingPayment, powerPayment, tdsDeductions, refNumber, remarks } = req.body;
  
  if (!badgeId) {
    return res.status(400).json({
      success: false,
      message: "Invalid Badge ID",
    });
  }

  try {
    const updated = await PaymentRecord.findByIdAndUpdate(
        badgeId,
        {
            date,
            stallPayment,
            brandingPayment,
            powerPayment,
            tdsDeductions,
            refNumber,
            remarks,
        }, 
        { new: true } // return the updated document
    );
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error updating badge",
      error: error.message,
    });
  }

};

export default updatePaymentRecord;
