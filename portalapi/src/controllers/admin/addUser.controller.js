import User from "../../models/user.model.js";

const addUser = async (req, res) => {

    const {
        name,
        email,
        password,
        role
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
            role
        });

        if (!user) {
            console.log("No data found for the given ID");
            return res.status(404).json({
                success: false,
                message: "Data not found for the given ID",
            });
        }

        res.status(201).json({
            success: true,
            message: 'User Added successfully',
            user,
        });

    } catch (error) {
        if (user && user._id) {
            await User.findByIdAndDelete(user._id); 
        }
        console.error("Error updating data:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error while updating the data",
            error: error.message,
        });
    }
};

export default addUser;
