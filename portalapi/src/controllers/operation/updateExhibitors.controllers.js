import { ExhibitorDetails } from "../../models/exhibitor/index.js";

const updateExhibitors = async (req, res) => {
    const exhibitorId = req.params.id;

    const {
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
    } = req.body;

    if (!exhibitorId) {
        return res.status(400).json({
            success: false,
            message: "Invalid Exhibitor ID",
        });
    }

    try {

        const updated = await ExhibitorDetails.findOneAndUpdate(
            { userId: exhibitorId },
            {
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
        console.error("Error updating MaterialAdda:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while updating the data",
            error: error.message,
        });
    }
};

export default updateExhibitors;
