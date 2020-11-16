import React from "react";
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from "react-native";
import Timer from '../components/timer';

const titleString = 'Memory Game';
const levelString = 'Level';
const scoreString = 'Score';
const timeLeftString = 'Time Left';

function Scoreboard({ level, score }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {titleString}
            </Text>
            <View style={styles.halfViewContainer}>
                <View style={styles.halfView}>
                    <Text style={styles.innerTitle}>
                        {levelString}
                    </Text>
                    <Text style={styles.innerValue}>
                        {level}
                    </Text>
                </View>
                <View style={styles.halfView}>
                    <Text style={styles.innerTitle}>
                        {scoreString}
                    </Text>
                    <Text style={styles.innerValue}>
                        {score}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.lowerTitle}>
                    {timeLeftString}
                </Text>
                <View style={{ flex: 1 }}>
                    <Timer />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        minHeight: 150,
        width: '100%'
    },
    title: {
        flex: 1,
        color: '#00c',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    lowerTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    halfViewContainer: {
        flexDirection: 'row',
        flex: 1
    },
    halfView: {
        flex: 1
    },
    innerTitle: {
        flex: 1,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    innerValue: {
        flex: 1,
        color: 'orange',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});

const mapStateToProps = (state) => {
    const { level, score } = state.game;
    return { level, score };
};

export default connect(mapStateToProps)(Scoreboard);
