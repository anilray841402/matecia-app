import { ExhibitorDetails } from "../../models/exhibitor/index.js";
import User from "../../models/user.model.js";

const deleteExhibitor = async (req, res) => {

    const exhibitorId = req.params.id;

    if (!exhibitorId) {
        return res.status(400).json({
            success: false,
            message: "Invalid Vendor ID",
        });
    }

    try {
        const deleted = await User.findByIdAndDelete(exhibitorId);
        if (deleted) {
            const deletedExhibitor = await ExhibitorDetails.findOneAndDelete({ userId: exhibitorId });
            if (!deletedExhibitor) {
                return res.status(404).json({
                    success: false,
                    message: "Data Not Found",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Data deleted successfully",
            });
        } else {
            return res.status(400).json({
                success: true,
                message: "Something went wrong",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error deleting vendor",
            error: error.message,
        });
    }

};

export default deleteExhibitor;
