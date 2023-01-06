import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import tasksSlice from "./tasksSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        tasks: tasksSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch