import { PowerOrder, ReOpenRequest } from "../../models/exhibitor/index.js";

const updatePowerOrder = async (req, res) => {

  const powerId = req.params.id;

  const { setUpDays, showDays, total, reopenId, status } = req.body;
  
  if (!powerId) {
    return res.status(400).json({
      success: false,
      message: "Invalid power ID",
    });
  }

  try {
    const updated = await PowerOrder.findByIdAndUpdate(
        powerId,
        {
            setUpDays, 
            showDays, 
            total,
            status,
        }, 
        { new: true }
    );
    const updatedReopen = await ReOpenRequest.findByIdAndUpdate( reopenId, { status });

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

export default updatePowerOrder;
