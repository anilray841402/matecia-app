import { AdditionalPowerOrder } from "../../models/exhibitor/index.js";

const getAdditionalPowerOrder = async (req, res) => {

  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {

    const AdditionalPower = await AdditionalPowerOrder.aggregate([
      {
        $lookup: {
          from: 'exhibitordetails',        
          localField: 'userId',               
          foreignField: 'userId',          
          as: 'details'
        }
      },
      {
        $unwind: {
          path: '$details',
          preserveNullAndEmptyArrays: true 
        }
      },
    ]);

    if (!AdditionalPower) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully here",
      data: AdditionalPower,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching data",
      error: error.message,
    });
  }

};

export default getAdditionalPowerOrder;
