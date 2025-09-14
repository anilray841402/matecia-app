import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // Changed import
import { CSpinner } from '@coreui/react';

const NotificationSystem = () => {
    const [loading, setLoading] = useState(false); // Changed to false initially
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [socketConnected, setSocketConnected] = useState(false);

    const userId = '6835570dd463279faf782bee';

    useEffect(() => {
        let socket;

        const initializeSocket = () => {
            try {
                // Initialize socket connection
                socket = io('ws://localhost:4000', {
                    transports: ['websocket', 'polling'] // Fallback transports
                });

                // Connection event handlers
                socket.on('connect', () => {
                    console.log('✅ Connected to server:', socket.id);
                    setSocketConnected(true);
                    socket.emit('join', userId);
                });

                socket.on('disconnect', () => {
                    console.log('❌ Disconnected from server');
                    setSocketConnected(false);
                });

                socket.on('connect_error', (error) => {
                    console.error('❌ Connection error:', error);
                    setSocketConnected(false);
                });

                // Listen for notifications
                socket.on('notification', (notification) => {
                    console.log('🔔 Notification received:', notification);
                    setNotifications(prev => [notification, ...prev]);
                    setUnreadCount(prev => prev + 1);
                });

            } catch (error) {
                console.error('Error initializing here socket:', error);
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

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/notifications/${userId}`);
            const data = await response.json();
            setNotifications(data.notifications || []);
            setUnreadCount(data.unreadCount || 0);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

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
            {/* Connection Status */}
            <div className={`mb-2 small ${socketConnected ? 'text-success' : 'text-danger'}`}>
                {socketConnected ? '🟢 Connected' : '🔴 Disconnected'}
            </div>

            {/* Notification Bell */}
            <div className="notification-bell d-flex align-items-center mb-3">
                <span className="fs-4">🔔</span>
                {unreadCount > 0 && (
                    <span className="badge bg-danger ms-2">{unreadCount}</span>
                )}
                <span className="ms-2">Notifications</span>
            </div>

            {/* Notification List */}
            <div className="notification-list">
                {notifications.length === 0 ? (
                    <div className="text-muted text-center p-3">
                        No notifications yet
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