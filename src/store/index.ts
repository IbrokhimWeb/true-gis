import { configureStore } from "@reduxjs/toolkit";
import steperSlice from "./steperSlice";

export const store = configureStore({
  reducer: {
    steper: steperSlice,
  },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
