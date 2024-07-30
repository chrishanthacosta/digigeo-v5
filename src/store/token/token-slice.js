import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jwtToken : '',
}

const tokenSlice = createSlice({
    name: "Token",
    initialState,
    reducers: {
        setJwtToken: (state, action) => {
            state.jwtToken = action.payload;
        }
    }
});

export const { setJwtToken } = tokenSlice.actions;
export default tokenSlice.reducer;