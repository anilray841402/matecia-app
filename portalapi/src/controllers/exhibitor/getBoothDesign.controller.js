import { BoothDesign, ReOpenRequest } from "../../models/exhibitor/index.js";
import mongoose from "mongoose";

const getBoothDesign = async (req, res) => {

  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const objectUserId = new mongoose.Types.ObjectId(userId); // Convert string to ObjectId
    const boothDesignById = await BoothDesign.find({ userId: objectUserId });
    const reOpenRequest = await ReOpenRequest.find({
      userId: objectUserId,
      type: 'boothdesign'
    });


    if (!boothDesignById) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: boothDesignById,
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

export default getBoothDesign;
