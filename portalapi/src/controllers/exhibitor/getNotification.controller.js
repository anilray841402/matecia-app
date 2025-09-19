import { Notification } from "../../models/exhibitor/index.js";
import mongoose from "mongoose";

const getNotification = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID",
        });
    }

    try {
        const objectUserId = new mongoose.Types.ObjectId(userId);
        const unreadCount = await Notification.countDocuments({
            userId: objectUserId,
            read: false
        });

        const records = await Notification.find({ userId: objectUserId })
            .select("message type read createdAt _id")
            .sort({ _id: -1 })
            .limit(10);

        if (!records || records.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Data Found",
            });
        }

        // transform array into same shape as socket pushes
        const notifications = records.map(r => ({
            message: r.message,
            id: r._id,
            type: r.type,
            read: r.read,
            timestamp: r.createdAt,
        }));

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            notifications,
            unreadCount 
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error fetching data",
            error: error.message,
        });
    }

};

export default getNotification;
