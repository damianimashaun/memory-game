import React from 'react';
import {
    View, StyleSheet, Text, Button
} from 'react-native';
import { connect } from 'react-redux'
import { restartGame } from '../redux/slices/game.slice';

const gameOverString = 'Game Over';
const gameCompleteString = 'Game Complete';
const tapToRestartString = 'Play Again';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 40,
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'blue',
        marginBottom: 5
    },
    score: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'orange',
        marginBottom: 20
    }
});

function GameOver({ isTimeOut, score, restartGame }) {
    const title = isTimeOut ? gameOverString : gameCompleteString;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.score}>
                {score}
            </Text>
            <Button
                title={tapToRestartString}
                onPress={() => {
                    restartGame();
                }}
            />
        </View>
    );
}

const mapDispatchToProps = { restartGame };

const mapStateToProps = (state: any) => {
    const { isTimeOut, isComplete, score } = state.game;
    return {
        isTimeOut, isComplete, score
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
