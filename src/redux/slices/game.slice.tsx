import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../models/card";
import { getShuffledArray } from "./utility/shuffle";

const emptyBoard: Card[] = [];

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        level: 10,
        score: 0,
        board: emptyBoard,
        inGame: false
    },
    reducers: {
        toggleCard: (state, action) => {

        },
        layBoard: (state) => {
            const { level } = state;
            const faceValues = getShuffledArray(level);

            let index = 0;
            state.board = faceValues.map((i) => {
                index++;

                return ({
                    faceValue: i,
                    isMatched: false,
                    isOpen: false,
                    id: index
                } as Card);
            });

            state.inGame = true;
        },
        toggleButton: (state, action) => {
            console.log('Toggle >>> ', action);
            const card = state.board.find((item) => item.id === action.payload);
            card.isOpen = true;
        }
    }
});

export const { toggleCard, layBoard, toggleButton } = gameSlice.actions;

export default gameSlice.reducer;
