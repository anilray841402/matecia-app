import { MaterialAdda } from "../../models/exhibitor/index.js";
import mongoose from "mongoose";

const getMaterialAdda = async (req, res) => {

  const userId = req.user.id;
  
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const objectUserId = new mongoose.Types.ObjectId(userId); // Convert string to ObjectId
    const materialAddaById = await MaterialAdda.find({ userId });
    if (!materialAddaById) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: materialAddaById,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching data",
      error: error.message,
    });
  }

};

export default getMaterialAdda;
