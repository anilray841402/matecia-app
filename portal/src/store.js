// src/store.js
import { legacy_createStore as createStore } from "redux";

const initialState = {
  sidebarShow: true,
  theme: "light",

  // 🔹 Notifications state
  notifications: {
    list: [],
    unreadCount: 0,
  },
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };

    // 🔹 Notifications handling
    // case "setNotifications":
    //   return {
    //     ...state,
    //     notifications: {
    //       ...state.notifications,
    //       list: rest.list,
    //     },
    //   };

    case "setUnreadCount":
      return {
        ...state,
        notifications: {
          ...state.notifications,
          unreadCount: rest.unreadCount,
        },
      };

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
