import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[],
    idCounter: 0
}

const bagSlice = createSlice({
    name:'bag',
    initialState,
    reducers:{
        addToBag:(state,action)=> {
            state.items.push(action.payload);
        },
        
    }
});


export const {addToBag} = bagSlice.actions;

export default bagSlice.reducer;