import {createSlice} from "@reduxjs/toolkit";

export const auth = createSlice({
    name:'auth',
    initialState:{
        user:false,
    },
    reducers:{
        setUser : (state,action) => {
            state.user = action.payload;
        },
        removeUser : (state) => {
            state.user = false;
        }
    }
})

export const {setUser,removeUser} = auth.actions;

export default auth.reducer;