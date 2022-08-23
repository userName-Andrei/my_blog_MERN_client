import {configureStore} from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';

const store = configureStore({
    reducer: {
        posts: postReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;