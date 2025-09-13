import { PaymentRecord } from "../../models/exhibitor/index.js";

const getPaymentRecord = async (req, res) => {

  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {

    const PaymentDetails = await PaymentRecord.aggregate([
      {
        $lookup: {
          from: 'exhibitordetails',        // exact collection name in MongoDB (should be lowercase)
          localField: 'userId',               // field in users collection
          foreignField: 'userId',          // field in exhibitordetails collection
          as: 'details'                    // alias for joined data
        }
      },
      {
        $unwind: {
          path: '$details',
          preserveNullAndEmptyArrays: true // keep users even if they don't have details
        }
      },
    ]);

    if (!PaymentDetails) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully here",
      data: PaymentDetails,
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
