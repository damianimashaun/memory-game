import * as React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'
import { Card } from "../models/card";
import { toggleButtonAsync } from '../redux/slices/game.slice';

function GameCell({ card, toggleButtonAsync }) {
    const hasCard = card !== undefined;

    return (
        <View style={styles.container}>
            {hasCard &&
                (
                    <View style={[styles.innerCell, {
                        backgroundColor: card.isOpen ? 'default' : ''
                    }]}>
                        {card.isOpen && <Text style={styles.centeredText}>
                            {card.faceValue}
                        </Text>}
                        {!card.isOpen &&
                            <TouchableOpacity
                                onPress={() => toggleButtonAsync(card.id)}
                                style={styles.centeredButton} />}
                    </View>
                )}
        </View>
    );
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


const mapStateToProps = (state, ownProps) => ({
    card: ownProps.card
});

const mapDispatchToProps = { toggleButtonAsync };

export default connect(mapStateToProps, mapDispatchToProps)(GameCell);

