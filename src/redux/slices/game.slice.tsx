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

            state.board = faceValues.map((i) => ({
                faceValue: i,
                isMatched: false,
                isOpen: true
            } as Card));

            state.inGame = true;
        }
    }
});

export const { toggleCard, layBoard } = gameSlice.actions;

export default gameSlice.reducer;
