import { ExhibitorDetails } from "../../models/exhibitor/index.js";
import User from "../../models/user.model.js";

const addExhibitor = async (req, res) => {

    const {
        piNumber,
        name,
        companyName,
        brandName,
        boothNumber,
        stallSize,
        standType,
        hallNumber,
        email,
        password,
        mobileNumber,
        additionalMobile,
        additionalEmail,
        address,
        websiteUrl,
        gstNumber,
        companyProfile
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required here",
        });
    }

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            textPassword: password,
            role: 'user'
        });
       
        const exhibitorDetails = await ExhibitorDetails.create({
            userId: user._id, // Link the exhibitor to the user
            piNumber,
            companyName,
            brandName,
            boothNumber,
            stallSize,
            standType,
            hallNumber,
            mobileNumber,
            additionalMobile,
            additionalEmail,
            address,
            websiteUrl,
            gstNumber,
            companyProfile
        });

        res.status(201).json({
            success: true,
            message: 'Exhibitor created successfully',
            user,
            exhibitorDetails
        });

        

        if (!exhibitorDetails) {
            console.log("No data found for the given ID");
            return res.status(404).json({
                success: false,
                message: "Data not found for the given ID",
            });
        }

    } catch (error) {
        console.error("Error updating data:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while updating the data",
            error: error.message,
        });
    }
};

export default addExhibitor;
