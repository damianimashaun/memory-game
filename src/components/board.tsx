import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import determineColumnByRow from '../redux/slices/utility/grouper';
import { layBoard } from '../redux/slices/game.slice';
import BoardRow from './boardRow';
import Scoreboard from './score';

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
            <Scoreboard />
            <View style={styles.cellContainer}
                contentContainerStyle={styles.cellContainer}>
                {dataBreaks.map((data, i) => {
                    return (
                        <BoardRow key={i} rowCount={columns} data={data} />
                    )
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    contentContainerStyle: {
    },
    cellContainer: {
        flex: 1,
        width: '100%',
        marginBottom: 10
    },
    flexOne: {
        flex: 1,
        width: '100%'
    }
});

const mapDispatchToProps = { layBoard };

const mapStateToProps = (state) => ({
    game: state.game
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
