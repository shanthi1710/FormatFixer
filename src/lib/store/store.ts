import { configureStore } from "@reduxjs/toolkit";
import csvDataReducer from "./csvDataSlice";

export const store = configureStore({
  reducer: {
    csvData: csvDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
