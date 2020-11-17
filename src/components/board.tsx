import React, { Ref, useEffect, useRef } from 'react';
import { AppState, View } from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import determineColumnByRow from '../redux/slices/utility/grouper';
import { loadGameAsync, saveGameAsync } from '../redux/slices/game.slice';
import BoardRow from './boardRow';
import Scoreboard from './score';
import styles from './board.styles';
import GameOver from './gameOver';

const stateActive = 'active';
const inactiveRegex = /inactive|background/;

const groupData = (level: number, dimensions: number[], board: []) => {
    if (board.length < 1) {
        return [];
    }

    const columns = dimensions[0];
    const rows = dimensions[1];
    const cellCount = board.length;
    const dataBreaks: [][] = [];

    for (let i = 0; i < rows; i++) {
        const start = i * columns;
        const fullEnd = start + columns;
        const end = fullEnd > cellCount ? cellCount : fullEnd;

        dataBreaks.push(board.slice(start, end));
    }

    return dataBreaks;
};

function Board({ game, startGame, saveGame }) {
    // console.log('Game > ', game);
    const appState = useRef(AppState.currentState);

    const handleStateChange = async (nextAppState) => {
        if (appState.current === stateActive && nextAppState.match(inactiveRegex)) {
            await saveGame();
        }
    };

    const {
        level, board, inGame, isComplete, isTimeOut
    } = game;

    if (!inGame && !(isComplete || isTimeOut)) {
        startGame();
        // return null;
    }

    useEffect(() => {
        // return (async () => {
        //     console.log('Exiting')
        //     await saveGame(game);
        // })
        AppState.addEventListener('change', handleStateChange);

        return () => console.log('unmounting...');
    }, []);


    const dimensions = determineColumnByRow(level);
    const columns = dimensions[0];

    const dataBreaks = groupData(level, dimensions, board);

    const displayBoard = () => dataBreaks.map((data, i) => (
        <BoardRow key={i} rowCount={columns} data={data} />
    ));

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

// Board.propTypes = {
//     game: PropTypes.shape({
//         level: PropTypes.number.isRequired,
//         board: PropTypes.arrayOf(
//             PropTypes.object
//         ).isRequired,
//         isComplete: PropTypes.bool.isRequired,
//         inGame: PropTypes.bool.isRequired,
//         isTimeOut: PropTypes.bool.isRequired,
//     }).isRequired,
//     layoutBoard: PropTypes.func.isRequired,
//     saveGame: PropTypes.func.isRequired
// };

const mapDispatchToProps = { startGame: loadGameAsync, saveGame: saveGameAsync };

const mapStateToProps = (state: any) => {
    const { game } = state;
    return { game };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
