import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice'

export const mainStore = configureStore({
    reducer: {
        auth: authReducer
    },
});


