import * as React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import { Card } from '../models/card';
import { toggleButtonAsync } from '../redux/slices/game.slice';

type cellProps = {
    card: Card,
    toggleButton: Function
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    innerCell: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 5
    },
    centeredText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    centeredButton: {
        flex: 1,
        backgroundColor: 'green'
    }
});

function GameCell({ card, toggleButton }: cellProps) {
    const hasCard = card !== undefined;
    const renderFace = () => (
        <Text style={styles.centeredText}>
            {card.faceValue}
        </Text>
    );

    const renderButton = () => (
        <TouchableOpacity
            onPress={() => toggleButton(card.id)}
            style={styles.centeredButton}
        />
    );

    const display = () => {
        const stateColor = card.isMatched ? 'green' : 'black';

        const backgroundStyle = {
            backgroundColor: card.isOpen ? 'default' : '',
            borderColor: stateColor,
            color: stateColor
        };

        return (
            <View
                style={[styles.innerCell, backgroundStyle]}
            >
                {card.isOpen && renderFace()}
                {!card.isOpen && renderButton()}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {hasCard && display()}
        </View>
    );
}
const mapStateToProps = (state, ownProps) => ({
    card: ownProps.card
});

const mapDispatchToProps = { toggleButton: toggleButtonAsync };

export default connect(mapStateToProps, mapDispatchToProps)(GameCell);
