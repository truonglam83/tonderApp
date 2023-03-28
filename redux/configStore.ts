import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chatReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
import photoReducer from "./reducers/photoReducer";
const store = configureStore({
  reducer: {
    loginReducer,
    chatReducer,
    userReducer,
    photoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
