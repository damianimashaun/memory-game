import { createSlice } from '@reduxjs/toolkit';
import { Card } from '../../models/card';
import { ReadState, SaveState, Clear, ClearState } from './utility/dataStore';
import { getShuffledArray } from './utility/shuffle';
import formatTime from './utility/timeFunctions';

const emptyBoard: Card[] = [];
const negativeOne = -1;
const maxLevel = 10;
const maxTime = 30000;

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
    milliseconds: maxTime, // 1200,
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

const makePlay = (state: any, level: number) => {
    state.board = makeCells(level);
    state.play = defaultPlayState(level + 1);
};

const setStartCommon = (
    state: any, level = 1, score = 0, inGame = true, isComplete = false,
    isTimeOut = false, milliseconds = maxTime, time = ''
) => {
    state.level = level;
    state.score = score;
    state.inGame = inGame;
    state.isComplete = isComplete;
    state.isTimeOut = isTimeOut;
    state.milliseconds = milliseconds;
    state.time = time;
};

export const gameSlice = createSlice({
    name: 'game',
    initialState: defaultState(10),
    reducers: {
        startGame: (state) => {
            const { level } = state;
            makePlay(state, level);
            state.inGame = true;
        },
        restartGame: (state) => {
            setStartCommon(state);
            ClearState();
            makePlay(state, 1);
        },
        loadGame: (state, action) => {
            const {
                level, score, board, inGame,
                play, isComplete, isTimeOut,
                milliseconds, time
            } = action.payload;

            setStartCommon(
                state, level, score, inGame, isComplete,
                isTimeOut, milliseconds, time
            );

            state.board = board;
            state.play = play;
        },
        flipCell: (state, action) => {
            const cellId = action.payload;
            const card = state.board.find((item) => item.id === cellId);
            card.isOpen = true;
        },
        toggleButton: (state, action) => {
            const {
                play, board, level, score
            } = state;

            const setPlayState = (up = false, face = negativeOne) => {
                state.play.oneUp = up;
                state.play.currentFace = face;
            };

            const progress = () => {
                const nextLevel = level + 1;

                if (nextLevel > 3) {
                    state.isComplete = true;
                    state.inGame = false;
                    return;
                }

                state.level = nextLevel;
                makePlay(state, nextLevel);
            };

            const card = board.find((item) => item.id === action.payload);

            if (!play.oneUp) {
                setPlayState(true, card.id);
                return;
            }

            const openCard = board.find((item) => item.id === play.currentFace);

            if (openCard.faceValue === card.faceValue) {
                openCard.isMatched = true;
                card.isMatched = true;

                const matches = ++play.matches;

                setPlayState();
                state.score = score + (level * 10);
                state.play.matches = matches;
                if (matches === play.max) {
                    progress();
                }

                return;
            }

            openCard.isOpen = false;
            card.isOpen = false;

            setPlayState();
        },
        tick: (state) => {
            const milliseconds = +state.milliseconds - 1;
            if (milliseconds === 0) {
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
    startGame, loadGame, toggleButton, flipCell, tick, restartGame
} = gameSlice.actions;

export const toggleButtonAsync = (id) => (dispatch) => {
    dispatch(flipCell(id));

    setTimeout(() => {
        dispatch(toggleButton(id));
    }, 200);
};

export const saveGameAsync = () => async (dispatch, getState) => {
    await SaveState(getState().game);
};

export const loadGameAsync = () => async (dispatch) => {
    const gameState = await ReadState();

    if (gameState === null) {
        dispatch(startGame());
    } else {
        dispatch(loadGame(gameState));
    }
};

export default gameSlice.reducer;
