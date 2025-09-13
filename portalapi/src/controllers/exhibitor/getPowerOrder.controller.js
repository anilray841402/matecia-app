import { PowerOrder, ExhibitorDetails, ReOpenRequest } from "../../models/exhibitor/index.js";
import mongoose from "mongoose";

const getPowerOrder = async (req, res) => {

  const userId = req.user.id;
  const user = req.user;
  
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const objectUserId = new mongoose.Types.ObjectId(userId); // Convert string to ObjectId
    const powerOrderdById = await PowerOrder.findOne({ userId: objectUserId });
    const exhibitorById = await ExhibitorDetails.findOne({ userId: objectUserId  });
    const reOpenRequest = await ReOpenRequest.findOne({ userId: objectUserId, type: 'powerorder'  });
    
    if (!powerOrderdById) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: powerOrderdById,
      exhibitor: exhibitorById,
      reOpenRequest: reOpenRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching data",
      error: error.message,
    });
  }

};

export default getPowerOrder;
