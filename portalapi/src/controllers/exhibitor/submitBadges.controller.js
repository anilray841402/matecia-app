import { ExhibitorBadges } from "../../models/exhibitor/index.js";

const submitBadges = async (req, res) => {
  const { name, companyName, designation, email, mobile } = req.body;

    if (!name || typeof name !== "string" ||
        !companyName || typeof companyName !== "string" ||
        !designation || typeof designation !== "string" ||

        !mobile || typeof mobile !== "string") {
       return res.status(400).json({
        success: false,
        message: "All fields are required and must be valid strings.",
      });
  }
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const exhibitorBadges = await ExhibitorBadges.create({ userId, name, companyName, designation, email, mobile });
    if (!exhibitorBadges) {
      return res.status(404).json({
        success: false,
        message: "Data not submited here",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data submited successfully",
      data: exhibitorBadges,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while submiting data",
      error: error.message,
    });
  }

};

export default submitBadges;
