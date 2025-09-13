import { BoothDesign, ReOpenRequest } from "../../models/exhibitor/index.js";

const updateBoothDesign = async (req, res) => {

  const boothDesignId = req.params.id;

  const { fabricatorType, fabricatorCompanyName, contactPerson, email, mobile, gst, status, reopenStatus, oldBoothDesignPath, reopenId } = req.body;
  
  const boothDesignPath = req.file?.filename ?? oldBoothDesignPath ?? null;

  if (!boothDesignId) {
    return res.status(400).json({
      success: false,
      message: "Invalid power ID",
    });
  }

  try {
    const updated = await BoothDesign.findByIdAndUpdate(
        boothDesignId,
        {
            fabricatorType, fabricatorCompanyName, contactPerson, email, mobile, gst, status, boothDesignPath
        }, 
        { new: true } // return the updated document
    );

    const updatedReopen = await ReOpenRequest.findByIdAndUpdate( reopenId, { status:reopenStatus });

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
      message: "Server error updating power order",
      error: error.message,
    });
  }

};

export default updateBoothDesign;
