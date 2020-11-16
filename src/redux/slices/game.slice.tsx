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

const defaultState = (level: number) => ({
    level,
    score: 0, // 0,
    board: emptyBoard,
    inGame: false,
    play: defaultPlayState(level + 1),
    isComplete: false, // false
    isTimeOut: false,
    milliseconds: 0, // 1200,
    time: ''
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

const progressState = (state: any, level: number) => {
    state.level = level;
    state.board = makeCells(level);
    state.play = defaultPlayState(level + 1);
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: defaultState(1),
    reducers: {
        restartGame: (state) => {
            console.log('here and now');
            state.level = 1;
            state.score = 0;
            state.isComplete = false;
            state.isTimeOut = false;
            state.milliseconds = 0;
            state.time = '';
            state.play = defaultPlayState(2);
            state.board = makeCells(1);

            state.inGame = true;
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
            const { play, board, level, score } = state;

            const setPlayState = (up = false, face = negativeOne) => {
                state.play.oneUp = up;
                state.play.currentFace = face;
            };

            const progressLevel = () => {
                const newLevel = level + 1;

                if (newLevel > 1) {
                    state.isComplete = true;
                    state.inGame = false;
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
            if (milliseconds === 1000) {
                state.isTimeOut = true;
                state.inGame = false;
                return;
            }
            
            state.milliseconds = milliseconds;
            state.time = formatTime(milliseconds);
        }
    }
});

export const {
    layBoard, toggleButton, flipCell, tick, restartGame
} = gameSlice.actions;

export const toggleButtonAsync = (id) => (dispatch) => {
    dispatch(flipCell(id));

    setTimeout(() => {
        dispatch(toggleButton(id));
    }, 200);
};

export default gameSlice.reducer;
