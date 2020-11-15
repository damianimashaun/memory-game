import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter.slice';
import gameReducer from './slices/game.slice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        game: gameReducer,
    },
});
