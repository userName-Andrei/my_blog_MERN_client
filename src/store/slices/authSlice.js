import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    user: null,
    status: 'waiting'
}

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (data) => {
        const user = await axios.post('/auth/login', data);

        if (user.token) {
            window.localStorage.setItem('token', user.token)
        }

        return user.data;
    }
)

export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async () => {
        const user = await axios.get('/auth/me');

        return user.data;
    }
)

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (data) => {
        const user = await axios.post('/auth/register', data);

        if (user.token) {
            window.localStorage.setItem('token', user.token)
        }

        return user.data;
    }
)

export const isAuthChecker = (state) => Boolean(state.auth.user);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = 'loaded'
        },
        [fetchLogin.rejected]: (state) => {
            state.user = null
            state.status = 'error'
        },
        [fetchAuth.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = 'loaded'
        },
        [fetchAuth.rejected]: (state) => {
            state.user = null
            state.status = 'error'
        },
        [fetchRegister.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = 'loaded'
        },
        [fetchRegister.rejected]: (state) => {
            state.user = null
            state.status = 'error'
        }
    }
})

export default authSlice.reducer;