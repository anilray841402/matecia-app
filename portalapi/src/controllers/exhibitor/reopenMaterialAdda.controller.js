import { MaterialAdda } from "../../models/exhibitor/index.js";

const reOpenMaterialAdda = async (req, res) => {

  const submitionId = req.params.id;

  const { status } = req.body;
  
  if (!submitionId) {
    return res.status(400).json({
      success: false,
      message: "Invalid power ID",
    });
  }

  try {
    const updated = await MaterialAdda.findByIdAndUpdate(
        submitionId,
        {
            status,
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
      message: "Server error updating power order",
      error: error.message,
    });
  }

};

export default reOpenMaterialAdda;
