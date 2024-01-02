import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

export const authSlice =  createSlice ({
    name: "auth",
    initialState, 
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user= null;
            state.token = null;
        }, 
        setLoading: (state, action) => {
            state.loading= action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null
        },
    },
});

export const { setLogin, setLogout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;