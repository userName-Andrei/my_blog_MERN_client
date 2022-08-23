import {configureStore} from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;