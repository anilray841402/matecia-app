import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // Changed import
import { CSpinner } from '@coreui/react';
import Cookies from 'js-cookie';
import apiClient from '../../service/apiClient';
import { useDispatch } from "react-redux";

const NotificationSystem = () => {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [userId, setUserId] = useState();
    const dispatch = useDispatch();


    useEffect(() => {
        const token = Cookies.get('token');
        const verifyToken = async () => {
            if (token) {
                try {
                    const res = await apiClient.verifyToken();
                    if (res.user.id) {
                        setUserId(res.user.id);
                    } else {
                        setUserId(false);
                    }
                } catch (err) {
                    console.error("Token verification failed", err);
                }
            } else {
                setUserId(false);
            }
        };

        verifyToken();
    }, []);

    useEffect(() => {
        let socket;

        const initializeSocket = () => {

            try {
                // Initialize socket connection
                socket = io('ws://localhost:4000', {
                    transports: ['websocket', 'polling']
                });

                // Connection event handlers
                socket.on('connect', () => {
                    console.log('✅ Connected to server:', socket.id);
                    socket.emit('join', userId);
                });

                // Listen for notifications
                socket.on("notification", (notification) => {
                    setNotifications((prev) => [notification, ...prev]);
                    setUnreadCount((prev) => {
                        const newCount = prev + 1;

                        dispatch({
                            type: "setUnreadCount",
                            unreadCount: newCount,
                        });

                        return newCount;
                    });
                });


            } catch (error) {
                console.error('Error initializing socket:', error);
            }
        };

        // Initialize socket
        initializeSocket();
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [userId]);

    useEffect(() => {
        fetchNotifications();
    }, [dispatch]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await apiClient.fetchNotifications();
            if (response) {
                const notifications = response.notifications || [];

                dispatch({
                    type: "setUnreadCount",
                    unreadCount: response.unreadCount,
                });
                setUnreadCount(response.unreadCount);
                setNotifications(notifications);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        dispatch({ type: "markAsRead", id: notificationId });
        const response = await apiClient.updateNotifications(notificationId);
        if (response.success) {
            fetchNotifications();
        }
    };


    if (loading) {
        return (
            <div className="text-center p-5">
                <CSpinner color="primary" />
                Loading your information...
            </div>
        );
    }

    return (
        <div className="notification-container p-3">

            {/* Notification Bell */}
            <div className="notification-bell d-flex align-items-center mb-3">
                <span className="fs-4">🔔</span>

                <span className="ms-2">All Notifications Listed Here</span>
            </div>

            {/* Notification List */}
            <div className="notification-list">
                {notifications.length === 0 ? (
                    <div className="text-muted text-center p-3">
                        No Notifications
                    </div>
                ) : (
                    notifications.map((notification, index) => (
                        <div
                            key={notification.id || index}
                            className={`notification-item border rounded p-3 mb-2 
                              ${notification.read ? "bg-light text-muted" : "bg-white fw-bold"}`}
                            onClick={() => markAsRead(notification.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="fw-bold text-primary">
                                {notification.type || 'General'}
                            </div>
                            <div>{notification.message}</div>
                            <div className="small text-muted">
                                {new Date(notification.timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationSystem;