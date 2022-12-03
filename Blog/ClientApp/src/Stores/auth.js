import {createSlice} from "@reduxjs/toolkit";

export const auth = createSlice({
    name:'auth',
    initialState:{
        user:false,
    },
    reducers:{
        logIn : (state,action) => {
            state.user = action.payload;
        },
        logOut : (state) => {
            state.user = false;
        }
    }
})

export const {logIn,logOut} = auth.actions;

export default auth.reducer;