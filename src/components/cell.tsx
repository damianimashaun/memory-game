import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card } from "../models/card";

export function GameCell(props) {
    const card: Card = props.card;
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
                        {!card.isOpen && <TouchableOpacity style={styles.centeredButton} />}
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
