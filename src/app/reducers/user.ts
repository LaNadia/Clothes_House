import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserInfo } from "features/Types";

const initialState = {
    email: null,
    token: null,
    id: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       setUser(state, action){
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
       },
       deleteUser(state){
        state.email = null;
        state.token = null;
        state.id = null;
       }
    }
});

export default userSlice.reducer;
export const {setUser, deleteUser} = userSlice.actions;