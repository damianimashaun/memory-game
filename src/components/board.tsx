import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import determineColumnByRow from '../redux/slices/utility/grouper';
import { layBoard } from '../redux/slices/game.slice';
import BoardRow from './boardRow';
import Scoreboard from './score';
import styles from './board.styles';
import GameOver from './gameOver';

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

function Board({
    level, board, inGame,
    isComplete, isTimeOut, layoutBoard
}) {
    console.log('Starting', inGame);

    if (!inGame && !(isComplete || isTimeOut)) {
        console.log('lay board');
        layoutBoard();
        // return null;
    }
    const dimensions = determineColumnByRow(level);
    const columns = dimensions[0];

    const dataBreaks = groupData(level, dimensions, board);

    const displayBoard = () => dataBreaks.map((data, i) => (
        <BoardRow key={i} rowCount={columns} data={data} />
    ));

    console.log('isComplete > ', isComplete);
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
    level: PropTypes.number.isRequired,
    board: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    isComplete: PropTypes.bool.isRequired,
    inGame: PropTypes.bool.isRequired,
    isTimeOut: PropTypes.bool.isRequired,
    layoutBoard: PropTypes.func.isRequired
};

const mapDispatchToProps = { layoutBoard: layBoard };

const mapStateToProps = (state: any) => {
    const {
        level, board, isComplete, inGame, isTimeOut
    } = state.game;

    return {
        level, board, isComplete, inGame, isTimeOut
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
