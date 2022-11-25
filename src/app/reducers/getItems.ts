import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCard } from "../../features/Types";


const initialState: any = {
    items: []
}

const getItems = createSlice({
    name: 'shoppinglist',
    initialState,
    reducers: {
        getShoppingItems(state, action:PayloadAction<TCard[]>) {
            state.items = action.payload
        }
    }
});

export default getItems.reducer;
export const { getShoppingItems} = getItems.actions;