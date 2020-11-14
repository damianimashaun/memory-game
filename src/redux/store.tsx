import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter.slice';

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
});
