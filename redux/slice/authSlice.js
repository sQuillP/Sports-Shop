import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
    token: null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        login:(state, action)=> {
            state.token = action.payload;
        },
        logout:(state,action)=> {
            state.token = null;
        }
    }
});


export const {login} = authSlice.actions;

export default authSlice.reducer;