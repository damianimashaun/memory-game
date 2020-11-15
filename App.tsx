import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Board from './src/components/board';
import store from './src/redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <Board />
            </SafeAreaProvider>
        </Provider>
    );
}
