import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: '',
    currentUser: {
        isAuth: false,
        currentUserName: undefined,
    },
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setText:(state, { payload }) => {
            state.searchText = payload
            console.log(payload);
         }
    },
});

export const {setText} = searchSlice.actions;

export default searchSlice.reducer;
