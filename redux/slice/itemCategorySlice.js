
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    category: "Shoes",
};


const itemCategorySlice = createSlice({

    name:'itemCategory',
    initialState,
    reducers: {
        changeCategory:(state,action)=> {
            state.category = action.payload;
        }
    }
});


export const {changeCategory} = itemCategorySlice.actions;

export default itemCategorySlice.reducer;