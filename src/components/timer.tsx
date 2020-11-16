import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { connect } from 'react-redux';
import { tick } from '../redux/slices/game.slice';

class Timer extends Component {
    intervalId = 0;

    componentDidMount = () => {
        this.start();
    }

    componentDidUpdate = (prevPops) => {
        const { inGame, isComplete, isTimeOut } = this.props;
        console.log('> ', inGame, isComplete, isTimeOut);
        const gameStarted = !prevPops.inGame && inGame;
        const gameComplete = !prevPops.isComplete && isComplete;
        const timeOut = !prevPops.isTimeout && isTimeOut;

        if (gameStarted) {
            this.start();
        } else if (gameComplete || timeOut) {
            this.stop();
        }
    }

    start = () => {
        this.intervalId = setInterval(() => {
            this.props.tick();
        }, 1);
    }

    stop = () => {
        clearInterval(this.intervalId);
    }

    componentWillUnmount = () => {
        this.stop();
    }

    render = () => (
        <View style={styles.flexOne}>
            <Text style={styles.text}>
                {this.props.time}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    flexOne: {
        flex: 1
    },
    text: {
        textAlign: 'center',
        color: 'orange',
        fontWeight: 'bold'
    }
});

const mapDispatchToProps = { tick };

const mapStateToProps = (state: any) => {
    const {
        inGame, isComplete, time, isTimeOut
    } = state.game;

    return {
        inGame, isComplete, isTimeOut, time
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
