import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSpinner } from '@coreui/react';
import apiClient from '../../service/apiClient';
import { Link } from "react-router-dom";

const NotificationSystem = () => {
    const dispatch = useDispatch();
    const { list: notifications, unreadCount } = useSelector(
        (state) => state.notifications
    );

    const markAsRead = async (notificationId) => {
        dispatch({ type: 'markAsRead', id: notificationId });
        const response = await apiClient.updateNotifications(notificationId);
        if (response.success) {
            // refresh list from server
            const updated = await apiClient.fetchNotifications();
            dispatch({
                type: 'set',
                notifications: {
                    list: updated.notifications,
                    unreadCount: updated.unreadCount,
                },
            });
        }
    };

    const getNotificationLink = (type) => {
        switch (type) {
            case "Booth Design Data":
                return "/exhibitor/booth-design";
            case "Reopen Request":
                return "/exhibitor/power-order";
            default:
                return "/exhibitor/dashboard";
        }
    };

    if (!notifications) {
        return (
            <div className="text-center p-5">
                <CSpinner color="primary" />
                Loading your notifications...
            </div>
        );
    }

    return (
        <div className="notification-container p-3">
            <div className="notification-bell d-flex align-items-center mb-3">
                <span className="fs-4">🔔</span>
                <span className="ms-2">
                    All Notifications Listed Here (Unread: {unreadCount})
                </span>
            </div>

            <div className="notification-list">
                {notifications.length === 0 ? (
                    <div className="text-muted text-center p-3">No Notifications</div>
                ) : (
                    notifications.map((notification, index) => {
                        const link = getNotificationLink(notification.type);

                        return (
                            <Link
                                to={link}
                                key={notification.id || index}
                                style={{ textDecoration: "none", color: "inherit" }}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div
                                    className={`notification-item border rounded p-3 mb-2 
                                    ${notification.read ? "bg-light text-muted" : "bg-white fw-bold"}`}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="fw-bold text-primary">
                                        {notification.type || "General"}
                                    </div>
                                    <div>{notification.message}</div>
                                    <div className="small text-muted">
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default NotificationSystem;
