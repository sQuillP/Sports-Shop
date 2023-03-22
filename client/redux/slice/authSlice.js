import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
    user:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        login:(state, action)=> {
            console.log(action.payload);
            state.user = action.payload;
        },
        signUp:(state,action)=> {
            state.user = action.payload;
        },
        logout:(state,action)=> {
            state.user= null;
        }
    }
});


export const {login, signUp} = authSlice.actions;

export default authSlice.reducer;