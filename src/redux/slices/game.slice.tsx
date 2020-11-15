import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../models/card";
import { getShuffledArray } from "./utility/shuffle";

const emptyBoard: Card[] = [];
const negativeOne = -1;

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        level: 10,
        score: 0,
        board: emptyBoard,
        inGame: false,
        play: {
            oneUp: false,
            currentFace: negativeOne,
            matches: 0
        }
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
        flipCell: (state, action) => {
            const { board } = state;
            const card = board.find((item) => item.id === action.payload);
            card.isOpen = true;
        },
        toggleButton: (state, action) => {
            const { play, board } = state;
            console.log('Play >>', play.matches);

            const card = board.find((item) => item.id === action.payload);
            //card.isOpen = true;

            if (!play.oneUp) {
                //card.isOpen = true;

                state.play.oneUp = true;
                state.play.currentFace = card.id;
                return;
            }

            const openCard = board.find((item) => item.id === play.currentFace);
            //console.log('Open Face', openCard);


            if (openCard.faceValue === card.faceValue) {
                openCard.isOpen = true;

                const matches = ++play.matches;

                state.play = {
                    oneUp: false,
                    currentFace: negativeOne,
                    matches
                };
                return;
            }

            openCard.isOpen = false;
            //setTimeout(() => {
            card.isOpen = false;
            //}, 400);

            state.play.oneUp = false;
            state.play.currentFace = negativeOne;
        }
    }
});

export const { toggleCard, layBoard, toggleButton, flipCell } = gameSlice.actions;

export const toggleButtonAsync = (id) => (dispatch) => {
    dispatch(flipCell(id));

    setTimeout(() => {
        dispatch(toggleButton(id));
    }, 200);
};

export default gameSlice.reducer;
