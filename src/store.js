import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./features/upload/uploadSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    auth: authReducer,
  },
});
