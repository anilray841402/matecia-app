import { VendorDetails } from "../../models/admin/index.js";
import User from "../../models/user.model.js";

const addVendor = async (req, res) => {

    const {
        name,
        companyName,
        email,
        password,
        mobileNumber,
        additionalMobile,
        additionalEmail,
        address,
        websiteUrl,
        gstNumber,
        type,
        companyProfile
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required here",
        });
    }

    let user;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        user = await User.create({
            name,
            email,
            password,
            textPassword: password,
            role: 'vendor'
        });

        const vendorData = await VendorDetails.create({
            userId: user._id,
            name,
            companyName,
            mobileNumber,
            additionalMobile,
            additionalEmail,
            address,
            websiteUrl,
            gstNumber,
            type,
            companyProfile
        });

        if (!vendorData) {
            console.log("No data found for the given ID");
            return res.status(404).json({
                success: false,
                message: "Data not found for the given ID",
            });
        }

        res.status(201).json({
            success: true,
            message: 'Vendor Added successfully',
            user,
            vendorData
        });

    } catch (error) {
        if (user && user._id) {
            await User.findByIdAndDelete(user._id); // rollback only if created
        }
        console.error("Error updating data:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while updating the data",
            error: error.message,
        });
    }
};

export default addVendor;
