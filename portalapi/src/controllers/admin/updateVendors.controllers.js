import { VendorDetails } from "../../models/admin/index.js";
import User from "../../models/user.model.js";

const updateVendors = async (req, res) => {
    const vendorId = req.params.id;
    const {
        companyName,
        name,
        type,
        mobileNumber,
        additionalMobile,
        additionalEmail,
        address,
        websiteUrl,
        gstNumber,
        companyProfile
    } = req.body;

    if (!vendorId) {
        return res.status(400).json({
            success: false,
            message: "Invalid Vendor ID",
        });
    }

    try {

        const updated = await VendorDetails.findOneAndUpdate(
            { userId: vendorId },
            {
                companyName,
                type,
                mobileNumber,
                additionalMobile,
                additionalEmail,
                address,
                websiteUrl,
                gstNumber,
                companyProfile
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

        return res.status(200).json({
            success: true,
            message: "Data updated successfully",
            data: updated,
        });
    } catch (error) {
        console.error("Error updating Vendor:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while updating the data",
            error: error.message,
        });
    }
};

export default updateVendors;
