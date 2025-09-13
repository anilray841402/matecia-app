import { PowerOrder, ReOpenRequest } from "../../models/exhibitor/index.js";

const submitPowerOrder = async (req, res) => {
    const { setUpDays, showDays, total, status } = req.body;
    const type = "powerorder";

    if (!setUpDays || !showDays) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and must be valid strings.",
      });
    }
    
  const userId = req.user.id;
  // console.log(userId);
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const powerOrders = await PowerOrder.create({ userId, setUpDays, showDays, total });
    const reOpenRequest = await ReOpenRequest.create({ userId, type, status });
    if (!powerOrders) {
      return res.status(404).json({
        success: false,
        message: "Data not submited here",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data submited successfully",
      data: powerOrders,
      reOpenRequest: reOpenRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while submiting data",
      error: error.message,
    });
  }

};

export default submitPowerOrder;
