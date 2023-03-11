import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import categoryReducer from '../slice/itemCategorySlice';

export const mainStore = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer
    },
});


