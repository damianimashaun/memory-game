import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
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
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}>
            {dataBreaks.map((data, i) => {
                return (
                    <BoardRow key={i} rowCount={columns} data={data} />
                )
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
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
