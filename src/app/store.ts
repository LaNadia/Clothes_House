import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import getStoryList from './reducers/getStoryList';
import getClothes from "./reducers/getClothes";

export const rootReducer = combineReducers( {
    storylist : getStoryList,
    clotheslist: getClothes
});

function saveToLocalStorage(store: any) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

export const store = configureStore({
    reducer: rootReducer, 
    preloadedState: persistedState
});

store.subscribe(() => saveToLocalStorage(store.getState()));


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


