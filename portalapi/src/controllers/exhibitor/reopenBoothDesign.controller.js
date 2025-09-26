import { ReOpenRequest } from "../../models/exhibitor/index.js";

const reopenBoothDesign = async (req, res) => {

  const userId = req.params.id;

  const { reopenStatus } = req.body;
  
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid Booth Design ID",
    });
  }

  try {
    const updated = await ReOpenRequest.findByIdAndUpdate(
        userId,
        {
            status: reopenStatus,
        }, 
        { new: true }
    );
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error updating power order",
      error: error.message,
    });
  }

};

export default reopenBoothDesign;
