import Notification from "../models/notificationModel.js";


export const createNotification = async (req, res) => {
   

    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json(  notification );
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating notification", error: error.message });
    }
};




export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find()
            .populate('sentUser') 
            .populate('receiveUser') 
            .populate('post') 
            .sort({ createdAt: -1 }); 

        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching notifications", error: error.message });
    }
};


export const deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }

        res.status(200).json({ success: true, message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting notification", error: error.message });
    }
};




export const updateNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndUpdate(
            id,
            { isSeen: true },
            { new: true } 
        );

        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found" });
        }

        res.status(200).json({ success: true, message: "Notification updated successfully", data: notification });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating notification", error: error.message });
    }
};
