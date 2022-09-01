import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    user: null,
    status: 'waiting',
    errorMessage: ''
}

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (data, {rejectWithValue}) => {
        try {
            const user = await axios.post('/auth/login', data);

            if (user.data.token) {
                window.localStorage.setItem('token', user.data.token)
            }

            return user.data;
        } catch (error) {
            if (error.request.status === 401) {
                return rejectWithValue(error.response.data.message)
            }
            throw error
        }
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

        if (user.data.token) {
            window.localStorage.setItem('token', user.data.token)
        }

        return user.data;
    }
)

export const isAuthChecker = (state) => Boolean(state.auth.user);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        'logout': (state) => {
            state.user = null
            window.localStorage.removeItem('token')
        }
    },
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.user = null;
            state.status = 'loading';
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.status = 'loaded';
        },
        [fetchLogin.rejected]: (state, action) => {
            state.user = null;
            state.status = 'error';
            state.errorMessage = action.payload;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.status = 'loaded';
        },
        [fetchRegister.pending]: (state) => {
            state.user = null;
            state.status = 'loading';
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.status = 'loaded';
        },
        [fetchRegister.rejected]: (state) => {
            state.user = null;
            state.status = 'error';
        }
    }
})

export const {logout} = authSlice.actions;

export default authSlice.reducer;