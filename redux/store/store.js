import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import categoryReducer from '../slice/itemCategorySlice';
import bagReducer from '../slice/bagSlice';



export const mainStore = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        bag: bagReducer
    },
});


