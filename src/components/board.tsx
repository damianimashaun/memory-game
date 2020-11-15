import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import determineColumnByRow from '../redux/slices/utility/grouper';
import { layBoard } from '../redux/slices/game.slice';
import BoardRow from './boardRow';

function Board({ game, layBoard }) {
    const {
        level,
        board,
        score,
        inGame
    } = game;

    if (!inGame) {
        layBoard();
        return null;
    }

    const dimensions = determineColumnByRow(level);
    const columns = dimensions[0];
    const rows = dimensions[1];
    const cellCount = board.length;
    const dataBreaks = [];

    for (let i = 0; i < rows; i++) {
        const start = i * columns;
        const fullEnd = start + columns;
        const end = fullEnd > cellCount ? cellCount : fullEnd;

        dataBreaks.push(board.slice(start, end));
    }

    return (
        <View style={styles.container}>
            {dataBreaks.map((data) => {
                return <BoardRow rowCount={columns} data={data} />
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        flex: 1
    }
});

const mapDispatchToProps = { layBoard };

const mapStateToProps = (state) => ({
    game: state.game
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
