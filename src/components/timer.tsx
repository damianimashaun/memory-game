import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { connect } from 'react-redux';
import { tick } from '../redux/slices/game.slice';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.props.tick();
        }, 1);
    }

    render = () => (
        <View styles={styles.flexOne}>
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

const mapStateToProps = (state) => ({
    inGame: state.game.inGame,
    time: state.game.time
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
