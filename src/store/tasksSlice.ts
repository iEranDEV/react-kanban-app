import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    tasks: Array<Task>(),
    draggedTask: null as Task | null
}

type UpdateTaskTable = {
    taskID: string,
    tableID: string,
}

export const tasksSlice = createSlice({
    name: 'categories',

    initialState,

    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        },
        deleteTask: (state, action: PayloadAction<Task>) => {
            state.tasks.splice(state.tasks.findIndex(item => item.id === action.payload.id), 1);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            state.tasks[state.tasks.findIndex(item => item.id === action.payload.id)] = action.payload;
        },
        setDraggedTask: (state, action: PayloadAction<Task | null>) => {
            state.draggedTask = action.payload;
        },
        updateTaskTable: (state, action: PayloadAction<UpdateTaskTable>) => {
            let val = state.tasks.find(item => item.id === action.payload.taskID);
            if(val) {
                val.tableID = action.payload.tableID;
            }
        }
    }
})

export const { addTask, updateTask, setDraggedTask, updateTaskTable, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;