import { Notification } from "../../models/exhibitor/index.js";

const updateNotification = async (req, res) => {

  const notificationId = req.params.id;

  
  if (!notificationId) {
    return res.status(400).json({
      success: false,
      message: "Invalid Badge ID",
    });
  }

  try {
    const updated = await Notification.findByIdAndUpdate(
        notificationId,
        {
            read : true,
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
      message: "Server error updating badge",
      error: error.message,
    });
  }

};

export default updateNotification;
