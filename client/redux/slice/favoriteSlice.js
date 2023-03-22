import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: []
}

const favoriteSlice = createSlice({
    name:'favorites',
    initialState,
    reducers: {
        addToFavorites(state, action) {
            state.items = action.payload;
        }
    }
});


export const {addToFavorites} = favoriteSlice.actions;

export default favoriteSlice.reducer;