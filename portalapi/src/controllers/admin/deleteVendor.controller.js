import { VendorDetails } from "../../models/admin/index.js";
import User from "../../models/user.model.js";

const deleteVendor = async (req, res) => {

    const vendorId = req.params.id;

    if (!vendorId) {
        return res.status(400).json({
            success: false,
            message: "Invalid Vendor ID",
        });
    }

    try {
        const deleted = await User.findByIdAndDelete(vendorId);
        if (deleted) {
            const deletedVendor = await VendorDetails.findOneAndDelete({ userId: vendorId });
            if (!deletedVendor) {
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

export default deleteVendor;
