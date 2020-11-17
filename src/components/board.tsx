import React, { useEffect, useRef } from 'react';
import { AppState, View } from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { DetermineColumnByRow, GroupData } from '../redux/slices/utility/grouper';
import { loadGameAsync, saveGameAsync } from '../redux/slices/game.slice';
import BoardRow from './boardRow';
import Scoreboard from './score';
import styles from './board.styles';
import GameOver from './gameOver';

const stateActive = 'active';
const changeListener = 'change';
const inactiveRegex = /inactive|background/;

function Board({ game, startGame, saveGame }) {
    const {
        level, board, inGame, isComplete, isTimeOut
    } = game;

    const dimensions = DetermineColumnByRow(level);
    const columns = dimensions[0];

    const dataBreaks = GroupData(dimensions, board);
    const displayBoard = () => dataBreaks.map((data, i) => (
        <BoardRow key={i} rowCount={columns} data={data} />
    ));

    const appState = useRef(AppState.currentState);
    const handleStateChange = async (nextAppState) => {
        if (appState.current === stateActive && nextAppState.match(inactiveRegex)) {
            await saveGame();
        }
    };

    if (!inGame && !(isComplete || isTimeOut)) {
        startGame();
    }

    useEffect(() => {
        AppState.addEventListener(changeListener, handleStateChange);

        return () => {
            console.log('unmounting...');
            saveGame();
        };
    }, []);

    const showBoard = !isComplete && !isTimeOut;

    return (
        <View style={styles.container}>
            <Scoreboard />

            {showBoard && (
                <View style={styles.cellContainer}>
                    {displayBoard()}
                </View>
            )}

            {!inGame && !showBoard && <GameOver />}
        </View>
    );
}

Board.propTypes = {
    game: PropTypes.shape({
        level: PropTypes.number.isRequired,
        board: PropTypes.arrayOf(
            PropTypes.object
        ).isRequired,
        isComplete: PropTypes.bool.isRequired,
        inGame: PropTypes.bool.isRequired,
        isTimeOut: PropTypes.bool.isRequired,
    }).isRequired,
    startGame: PropTypes.func.isRequired,
    saveGame: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    startGame: loadGameAsync,
    saveGame: saveGameAsync
};

const mapStateToProps = (state: any) => {
    const { game } = state;
    return { game };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
