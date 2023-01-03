import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    categories: Array<Category>({
        id: "default",
        name: "Default category",
        tables: [{name: "To do", color: "#dc2626"}, {name: "Doing", color: "#eab308"}, {name: "Done", color: "#22c55e"}]
    },
    {
        id: "default2",
        name: "Second category",
        tables: [{name: "To do", color: "#eab308"}, {name: "Doing", color: "#eab308"}, {name: "Done", color: "#22c55e"}]
    }),
    currentCategory: "default"
}

export const categoriesSlice = createSlice({
    name: 'categories',

    initialState,

    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload)
        },
        setCurrentCategory: (state, action: PayloadAction<Category>) => {
            state.currentCategory = action.payload.id;
        }
    }
})

export const { addCategory, setCurrentCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;