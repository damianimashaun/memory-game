import { createSlice } from "@reduxjs/toolkit";
import { State } from "react-native-gesture-handler";
import { Card } from "../../models/card";
import { getShuffledArray } from "./utility/shuffle";
import formatTime from "./utility/timeFunctions";

const emptyBoard: Card[] = [];
const negativeOne = -1;
const maxLevel = 10;
const maxTime = 6000;

const defaultPlayState = (max: number) => ({
    oneUp: false,
    currentFace: negativeOne,
    matches: 0,
    max
});

const defaultState = {
    level: 1,
    score: 0,
    board: emptyBoard,
    inGame: false,
    play: defaultPlayState(0),
    isComplete: false,
    isTimeOut: false,
    milliseconds: 0,
    time: ''
};

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

const progressState = (state: any, level: number) => {
    state.level = level;
    state.board = makeCells(level);
    state.play = defaultPlayState(level + 1);
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: defaultState,
    reducers: {
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
            const { play, board, level, score } = state;

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
                state.score = score + (level * 10);
                state.play.matches = matches;
                if (matches === play.max) {
                    progressLevel();
                }
                return;
            }

            openCard.isOpen = false;
            card.isOpen = false;

            setPlayState();
        },
        tick: (state) => {
            const milliseconds = +state.milliseconds + 1;
            if (milliseconds === maxTime) {
                state.isTimeOut = true;
                return;
            }
            state.milliseconds = milliseconds;
            state.time = formatTime(milliseconds);
        }
    }
});

export const {
    layBoard, toggleButton, flipCell, tick
} = gameSlice.actions;

export const toggleButtonAsync = (id) => (dispatch) => {
    dispatch(flipCell(id));

    setTimeout(() => {
        dispatch(toggleButton(id));
    }, 200);
};

export default gameSlice.reducer;
