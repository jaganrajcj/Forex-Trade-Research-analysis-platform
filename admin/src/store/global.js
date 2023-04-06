import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: localStorage.getItem("mode") ? localStorage.getItem("mode") : 'light',
    user: {
        id: '',
        token: ''
    }
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? "dark" : 'light';
            localStorage.setItem("mode", state.mode)
        }
    }
})

export const { setMode } = globalSlice.actions
export default globalSlice.reducer