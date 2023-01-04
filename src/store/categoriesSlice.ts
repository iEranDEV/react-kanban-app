import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    categories: Array<Category>({
        id: "default",
        name: "Default category",
        tables: [{id: "1", name: "To do", color: "#dc2626"}, {id: "2",name: "Doing", color: "#eab308"}, {id: "3",name: "Done", color: "#22c55e"}]
    },
    {
        id: "default2",
        name: "Second category",
        tables: [{id: "4",name: "To do", color: "#eab308"}, {id: "5",name: "Doing", color: "#eab308"}, {id: "6",name: "Done", color: "#22c55e"}]
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
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            state.categories[state.categories.findIndex(item => item.id === action.payload.id)] = action.payload;
        }
    }
})

export const { addCategory, setCurrentCategory, updateCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;