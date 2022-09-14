import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCard } from "../../features/Types";


const initialState: any  = {
    arrival: [],
    trending: []
}

const getClothes = createSlice({
    name: 'clotheslist',
    initialState,
    reducers: {
        getArrival(state, action:PayloadAction<TCard[]>) {
            state.arrival = action.payload;
        },
        getTrending(state, action:PayloadAction<TCard[]>) {
            state.trending = action.payload;
        },

    }
});

export default getClothes.reducer;
export const { getArrival, getTrending} = getClothes.actions;