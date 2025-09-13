import { BoothDesign, ReOpenRequest } from "../../models/exhibitor/index.js";

const submitBoothDesign = async (req, res) => {
  const { fabricatorType, fabricatorCompanyName, contactPerson, email, mobile, gst, status, reopenStatus } = req.body;
  const type = "boothdesign";

  const boothDesignPath = req.file?.filename ?? null;
  // console.log("Body here", req.body);
  // console.log("file here", req.file.filename);
  // return

    if (!fabricatorType || typeof fabricatorType !== "string") {
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
    const boothdesign = await BoothDesign.create({ userId, fabricatorType, fabricatorCompanyName, contactPerson, email, mobile, gst, status, boothDesignPath });
    const reOpenRequest = await ReOpenRequest.create({ userId, type, status:reopenStatus });
    if (!boothdesign) {
      return res.status(404).json({
        success: false,
        message: "Data not submited here",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data submited successfully",
      data: boothdesign,
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

export default submitBoothDesign;
