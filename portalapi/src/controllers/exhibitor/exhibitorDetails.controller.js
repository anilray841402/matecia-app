import mongoose from "mongoose";
import { ExhibitorDetails } from "../../models/exhibitor/index.js";

const getExhibitorDetails = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const objectUserId = new mongoose.Types.ObjectId(userId);
    const exhibitorData = await ExhibitorDetails.findOne({ userId: objectUserId });

    if (!exhibitorData) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: exhibitorData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching data",
      error: error.message,
    });
  }
};

export default getExhibitorDetails;
