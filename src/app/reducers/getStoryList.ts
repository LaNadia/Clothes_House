import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStory } from "../../features/Types";


const initialState: any  = {
    stories: []
}

const getStoryList = createSlice({
    name: 'storylist',
    initialState,
    reducers: {
        getStories(state, action: PayloadAction<TStory[]>) {
                state.stories = action.payload;      
        }
    }
});

export default getStoryList.reducer;
export const {getStories} = getStoryList.actions;