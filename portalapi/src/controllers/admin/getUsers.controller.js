import User from "../../models/user.model.js";


const getUsers = async (req, res) => {

    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID",
        });
    }

    try {
    const users = await User.aggregate([
        {
            $match: {
                role: { $in: ['account', 'operation'] }
            }
        },
    ]);

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No users found with the specified roles",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data: users,
    });
} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Server error fetching data",
        error: error.message,
    });
}
};

export default getUsers;
