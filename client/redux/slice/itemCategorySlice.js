
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const searchItem = createAsyncThunk("itemCategory/searchItem", async (category, ThunkApi)=> {
    const URL = "http://10.0.2.2:3000/items"
    try{
        const response = await axios.get(`${URL}/${category.name}`,{...category.options, timeout: 10000},);
        return response.data.data;
    } catch(error) {
        console.log("in thunk: ", error.message);
        return ThunkApi.rejectWithValue([]);
    }
});


const initialState = {
    category: "shoes",
    items:[],
    fetchingResults: false
};


const itemCategorySlice = createSlice({

    name:'itemCategory',
    initialState,
    reducers: {
        changeCategory:(state,action)=> {
            state.category = action.payload;
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(searchItem.fulfilled,(state,action)=> {
            state.items = action.payload;
            state.fetchingResults= false;
        });
        builder.addCase(searchItem.pending,(state,action)=> {
            state.fetchingResults = true;
        });

        builder.addCase(searchItem.rejected,(state,action)=> {
            state.items = action.payload;
            state.fetchingResults = false;
        })
    }
});


export const {changeCategory} = itemCategorySlice.actions;

export default itemCategorySlice.reducer;