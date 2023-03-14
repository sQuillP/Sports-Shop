import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
    token: "token"
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        login:(state, action)=> {
            state.token = action.payload;
        },
        signUp:(state,action)=> {
            state.token = action.payload;
        },
        logout:(state,action)=> {
            state.token = null;
        }
    }
});


export const {login, signUp} = authSlice.actions;

export default authSlice.reducer;