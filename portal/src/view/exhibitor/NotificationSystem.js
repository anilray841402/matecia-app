import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // Changed import
import { CSpinner } from '@coreui/react';
import Cookies from 'js-cookie';
import apiClient from '../../service/apiClient';

const NotificationSystem = () => {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [userId, setUserId] = useState();


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
                socket.on('notification', (notification) => {
                    console.log('🔔 Notification received:', notification);
                    setNotifications(prev => [notification, ...prev]);
                    setUnreadCount(prev => prev + 1);
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

    useEffect(()=>{
        const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await apiClient.fetchNotifications();

            // Assuming response.notifications is an array
            const notifications = response.notifications || [];

            // Push notifications one by one like socket listener does
            setNotifications(prev => [
                ...notifications.map(n => n),
                
            ]);

            // If unreadCount is sent by backend, use it. Otherwise count manually.
            setUnreadCount(response.unreadCount ?? notifications.length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchNotifications();
    }, [])
    
    const markAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === notificationId
                    ? { ...notif, read: true }
                    : notif
            )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
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
                {unreadCount > 0 && (
                    <span className="badge bg-danger ms-2">{unreadCount}</span>
                )}
                <span className="ms-2"> Notifications</span>
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
                            className="notification-item border rounded p-3 mb-2 bg-light"
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