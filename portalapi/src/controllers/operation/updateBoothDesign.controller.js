import { BoothDesign } from "../../models/exhibitor/index.js";

const updateBoothDesign = async (req, res) => {
    const boothDesignId = req.params.id;

    const { status } = req.body;
    
    if (!boothDesignId) {
        return res.status(400).json({
            success: false,
            message: "Invalid Exhibitor ID",
        });
    }

    try {

        const updated = await BoothDesign.findOneAndUpdate(
            { _id: boothDesignId },
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

        // Send real-time notification
        const idOfUser = '6835570dd463279faf782bee';
        const message = "Your Booth design has submited successfully";
        const type = "boothdesign";
        console.log(`🔔 Sending notification to user: ${idOfUser}`);
        console.log(`📝 Message: ${message}`);
        req.io.to(idOfUser).emit('notification', {
            message,
            type,
            timestamp: new Date()
        });

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

export default updateBoothDesign;
