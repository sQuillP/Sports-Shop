import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
}

const bagSlice = createSlice({
    name:'bag',
    initialState,
    reducers:{
        addToBag:(state,action)=> {
            state.items = action.payload;
        },
    }
});


export const {addToBag} = bagSlice.actions;

export default bagSlice.reducer;