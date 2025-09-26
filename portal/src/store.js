// src/store.js
import { legacy_createStore as createStore } from "redux";

const initialState = {
  sidebarShow: true,
  theme: "light",

  notifications: {
    list: [],
    unreadCount: 0,
  },
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };

    case "setNotifications":
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: rest.list || [],
        },
      };

    case "setUnreadCount":
      return {
        ...state,
        notifications: {
          ...state.notifications,
          unreadCount: Number(rest.unreadCount) || 0,
        },
      };

    case "addNotification": {
      const incoming = rest.notification;
      const filtered = state.notifications.list.filter(
        (n) => n.id !== incoming.id
      );
      return {
        ...state,
        notifications: {
          list: [incoming, ...filtered],
          unreadCount: state.notifications.unreadCount + 1,
        },
      };
    }

    case "markAsRead":
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: state.notifications.list.map((n) =>
            n.id === rest.id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.notifications.unreadCount - 1),
        },
      };

    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
