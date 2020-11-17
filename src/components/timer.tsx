import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tick } from '../redux/slices/game.slice';

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

class Timer extends React.Component {
    intervalId = 0;

    componentDidMount = () => {
        this.start();
    }

    componentDidUpdate = (prevPops) => {
        const { inGame, isComplete, isTimeOut } = this.props;
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

Timer.propTypes = {
    inGame: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
    isTimeOut: PropTypes.bool.isRequired,
    time: PropTypes.string.isRequired,
    tick: PropTypes.func.isRequired
};

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
