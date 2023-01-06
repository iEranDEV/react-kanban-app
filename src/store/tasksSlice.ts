import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    tasks: Array<Task>(),
}

export const tasksSlice = createSlice({
    name: 'categories',

    initialState,

    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            state.tasks[state.tasks.findIndex(item => item.id === action.payload.id)] = action.payload;
        }
    }
})

export const { addTask, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;