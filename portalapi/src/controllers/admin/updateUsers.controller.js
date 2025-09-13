import User from "../../models/user.model.js";

const updateUsers = async (req, res) => {
    const userId = req.params.id;
    // console.log('Request method:', req.method);
    // console.log('Content-Type:', req.headers['content-type']);
    // console.log('Raw body:', req.body);
    // return

    const {
        name,
        email,
        role
    } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID",
        });
    }

    try {

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId }, 
            {
                name,
                email,
                role
            },
            { new: true }
        );

        if (!updatedUser) {
            console.log("No data found for the given ID");
            return res.status(404).json({
                success: false,
                message: "Data not found for the given ID",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data updated successfully",
            data: updatedUser, 
        });
    } catch (error) {
        console.error("Error updating User:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while updating the data",
            error: error.message,
        });
    }
};

export default updateUsers;
