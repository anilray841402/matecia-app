import { PaymentRecord } from "../../models/exhibitor/index.js";

const deletePaymentRecord = async (req, res) => {

  const badgeId = req.params.id;
  
  if (!badgeId) {
    return res.status(400).json({
      success: false,
      message: "Invalid Badge ID",
    });
  }

  try {
    const deleted = await PaymentRecord.findByIdAndDelete(badgeId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error deleting badge",
      error: error.message,
    });
  }

};

export default deletePaymentRecord;
