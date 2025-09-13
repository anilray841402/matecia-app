import { ReOpenRequest } from "../../models/exhibitor/index.js";

const reOpenPowerOrder = async (req, res) => {

  const powerId = req.params.id;

  const { status } = req.body;
  
  if (!powerId) {
    return res.status(400).json({
      success: false,
      message: "Invalid power ID",
    });
  }

  try {
    const updated = await ReOpenRequest.findByIdAndUpdate(
        powerId,
        {
            status,
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
      message: "Server error updating power order",
      error: error.message,
    });
  }

};

export default reOpenPowerOrder;
