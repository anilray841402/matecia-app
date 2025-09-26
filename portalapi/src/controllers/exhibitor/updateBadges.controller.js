import { ExhibitorBadges } from "../../models/exhibitor/index.js";

const updateBadges = async (req, res) => {

  const badgeId = req.params.id;

  const { name, designation, companyName, email, mobile } = req.body;
  
  if (!badgeId) {
    return res.status(400).json({
      success: false,
      message: "Invalid Badge ID",
    });
  }

  try {
    const updated = await ExhibitorBadges.findByIdAndUpdate(
        badgeId,
        {
            name,
            designation,
            companyName,
            email,
            mobile,
        }, 
        { new: true }
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
      message: "Server error updating badge",
      error: error.message,
    });
  }

};

export default updateBadges;
