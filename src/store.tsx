import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './mainSlice';

const loadState = (): RootState | undefined => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as RootState;
    } catch (err) {
        console.error('Failed to load state from localStorage:', err);
        return undefined;
    }
};

const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error('Failed to save state to localStorage:', err);
    }
};

const persistedState = loadState();

const store = configureStore({
    reducer: {
        main: mainReducer,
    },
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
