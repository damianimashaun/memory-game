import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/game.slice';

export default configureStore({
    reducer: {
        game: gameReducer,
    },
});
