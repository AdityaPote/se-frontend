import { configureStore } from "@reduxjs/toolkit";
import seReducer from "../features/seSlice";

export const store = configureStore({
  reducer: {
    se: seReducer,
  },
});
