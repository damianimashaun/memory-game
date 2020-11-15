import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../models/card";
import { getShuffledArray } from "./utility/shuffle";

const emptyBoard: Card[] = [];
const negativeOne = -1;
const maxLevel = 10;

const defaultPlayState = (max: number) => ({
    oneUp: false,
    currentFace: negativeOne,
    matches: 0,
    max
});

const makeCells = (level: number) => {
    const values = getShuffledArray(level);
    let index = 0;

    return values.map((i) => {
        index++;

        return ({
            faceValue: i,
            isMatched: false,
            isOpen: false,
            id: index
        } as Card);
    });
};

const defaultState = {
    level: 1,
    score: 0,
    board: emptyBoard,
    inGame: false,
    play: defaultPlayState(0),
    isComplete: false
};

const progressState = (state: any, level: number) => {
    state.level = level;
    state.board = makeCells(level);
    state.play = defaultPlayState(level + 1);
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: defaultState,
    reducers: {
        toggleCard: (state, action) => {

        },
        layBoard: (state) => {
            const { level } = state;

            state.board = makeCells(level);
            state.play = defaultPlayState(level + 1);
            state.inGame = true;
        },
        flipCell: (state, action) => {
            const card = state.board.find((item) => item.id === action.payload);
            card.isOpen = true;
        },
        toggleButton: (state, action) => {
            const { play, board, level } = state;

            const setPlayState = (up = false, face = negativeOne) => {
                state.play.oneUp = up;
                state.play.currentFace = face;
            };

            const progressLevel = () => {
                const newLevel = level + 1;

                if (newLevel > maxLevel) {
                    state.isComplete = true;
                } else {
                    progressState(state, newLevel);
                }
            };

            const card = board.find((item) => item.id === action.payload);

            if (!play.oneUp) {
                setPlayState(true, card.id);
                return;
            }

            const openCard = board.find((item) => item.id === play.currentFace);

            if (openCard.faceValue === card.faceValue) {
                const matches = ++play.matches;
                console.log('Matches >> ', matches, matches === play.max);

                setPlayState();
                state.play.matches = matches;
                if (matches === play.max) {
                    progressLevel();
                }
                return;
            }

            openCard.isOpen = false;
            card.isOpen = false;

            setPlayState();
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
