import { configureStore } from '@reduxjs/toolkit';
import audioPlayerReducer from './reduxSlice/audioSlice';

export const store = configureStore({
    reducer: {
        audioPlayer: audioPlayerReducer,
    },
})