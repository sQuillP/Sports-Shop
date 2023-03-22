import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import categoryReducer from '../slice/itemCategorySlice';
import bagReducer from '../slice/bagSlice';
import favoriteReducer from '../slice/favoriteSlice';


export const mainStore = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        bag: bagReducer,
        favorites: favoriteReducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck: false})
});


