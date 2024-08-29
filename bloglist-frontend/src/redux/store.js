import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogsReducer,
  },
});

export default store;
