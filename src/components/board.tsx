import React, { useEffect, useRef } from 'react';
import { AppState, View } from 'react-native';
import { connect } from 'react-redux';
import { DetermineColumnByRow, GroupData } from '../redux/slices/utility/grouper';
import { loadGameAsync, saveGameAsync, startGame } from '../redux/slices/game.slice';
import BoardRow from './boardRow';
import Scoreboard from './score';
import styles from './board.styles';
import GameOver from './gameOver';
import { Card } from '../models/card';

type boardTypes = {
    game: {
        level: number,
        board: Card[],
        isComplete: boolean,
        inGame: boolean,
        isTimeOut: boolean,
    },
    startGame: Function,
    saveGame: Function
};

const stateActive = 'active';
const changeListener = 'change';
const inactiveRegex = /inactive|background/;

function Board({ game, startGame, saveGame }: boardTypes) {
    const {
        level, board, inGame, isComplete, isTimeOut
    } = game;

    const dimensions = DetermineColumnByRow(level);
    const dataBreaks = GroupData(dimensions, board);

    const displayBoard = () => (
        <View style={styles.cellContainer}>
            {dataBreaks.map((data, i) => (
                <BoardRow key={i} columnCount={dimensions[0]} data={data} />
            ))}
        </View>
    );

    const appState = useRef(AppState.currentState);
    const handleStateChange = async (nextAppState) => {
        if (appState.current === stateActive
            && nextAppState.match(inactiveRegex)) {
            await saveGame();
        }
    };

    useEffect(() => {
        AppState.addEventListener(changeListener, handleStateChange);

        return () => {
            console.log('unmounting...');
            saveGame();
        };
    }, []);

    if (!inGame && !(isComplete || isTimeOut)) {
        startGame();
    }

    const showBoard = !isComplete && !isTimeOut;

    return (
        <View style={styles.container}>
            <Scoreboard />

            {showBoard && displayBoard()}

            {!inGame && !showBoard && <GameOver />}
        </View>
    );
}

const mapDispatchToProps = {
    startGame: loadGameAsync,
    saveGame: saveGameAsync
};

const mapStateToProps = (state: any) => {
    const { game } = state;
    return { game };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
