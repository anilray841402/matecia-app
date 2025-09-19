import { ReOpenRequest } from "../../models/exhibitor/index.js";
import { Notification } from "../../models/exhibitor/index.js";

const updateReopenRequest = async (req, res) => {
    const reopenRequestId = req.params.id;
    const { status } = req.body;

    if (!reopenRequestId) {
        return res.status(400).json({
            success: false,
            message: "Invalid Exhibitor ID",
        });
    }

    try {

        const updated = await ReOpenRequest.findOneAndUpdate(
            { _id: reopenRequestId },
            {
                status
            },
            { new: true }
        );

        if (!updated) {
            console.log("No data found for the given ID");
            return res.status(404).json({
                success: false,
                message: "Data not found for the given ID",
            });
        }

        const message = `Reopen Request for ${updated.type} has been approved successfully`;
        const type = "Reopen Request";
        const userId = '6835570dd463279faf782bee';
        const saveNotification = await Notification.create({ userId, message, type });

        if (saveNotification) {
            // console.log('test notification', userId);
            // return
            req.io.to(userId).emit("notification", {
                message,
                type,
                timestamp: new Date(),
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data updated successfully",
            data: updated, // Send back the updated object for confirmation
        });
    } catch (error) {
        console.error("Error updating Booth Design:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while updating the data",
            error: error.message,
        });
    }
};

export default updateReopenRequest;
