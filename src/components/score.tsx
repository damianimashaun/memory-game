import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Timer from '../components/timer';
import styles from './score.styles';

type scoreBoardProps = {
    level: number,
    score: number
};

const titleString = 'Memory Game';
const levelString = 'Level';
const scoreString = 'Score';
const timeLeftString = 'Time Left';

function Scoreboard({ level, score }: scoreBoardProps) {
    const renderBoardItem = (title: string, text: number) => (
        <View style={styles.flexOne}>
            <Text style={styles.innerTitle}>
                {title}
            </Text>
            <Text style={styles.innerValue}>
                {text}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {titleString}
            </Text>
            <View style={styles.halfViewContainer}>
                {renderBoardItem(levelString, level)}
                {renderBoardItem(scoreString, score)}
            </View>
            <View style={styles.flexOne}>
                <Text style={styles.lowerTitle}>
                    {timeLeftString}
                </Text>
                <View style={styles.flexOne}>
                    <Timer />
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = (state: any) => {
    const { level, score } = state.game;
    return { level, score };
};

export default connect(mapStateToProps)(Scoreboard);
