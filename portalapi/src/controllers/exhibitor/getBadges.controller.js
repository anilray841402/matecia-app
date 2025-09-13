import { ExhibitorBadges } from "../../models/exhibitor/index.js";

const getBadges = async (req, res) => {

  const userId = req.user.id;
  
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const exhibitorBadges = await ExhibitorBadges.find({ userId });
    if (!exhibitorBadges) {
      return res.status(404).json({
        success: false,
        message: "Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: exhibitorBadges,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error fetching data",
      error: error.message,
    });
  }

};

export default getBadges;
