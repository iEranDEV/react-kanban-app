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
    }
})

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;