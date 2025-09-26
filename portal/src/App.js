import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import apiClient from './service/apiClient';
import routes from './routes';

function App() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const verifyToken = async () => {
      if (token) {
        try {
          const res = await apiClient.verifyToken();
          if (res?.user?.id) {
            setUserId(res.user.id);
          }
        } catch (err) {
          console.error('Token verification failed', err);
        }
      }
    };
    verifyToken();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = io('ws://localhost:4000', {
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('✅ Connected to server:', socket.id);
      socket.emit('join', userId);
    });

    socket.on('notification', (notification) => {
      const normalized = {
        id: notification.id || notification._id,
        message: notification.message,
        type: notification.type,
        read: notification.read ?? false,
        timestamp: notification.timestamp || new Date().toISOString(),
      };

      dispatch({ type: 'addNotification', notification: normalized });
    });

    return () => socket.disconnect();
  }, [userId, dispatch]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiClient.fetchNotifications();
        if (response) {
          dispatch({ type: 'setNotifications', list: response.notifications || [] });
          dispatch({ type: 'setUnreadCount', unreadCount: response.unreadCount || 0 });
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    if (userId) fetchNotifications();
  }, [userId, dispatch]);

  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <Routes>
        {routes.map((route, idx) => {
          const Element = route.element;
          const Component = route.component || null;

          return (
            <Route
              key={idx}
              path={route.path}
              element={<Element component={Component} />}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export default App;
