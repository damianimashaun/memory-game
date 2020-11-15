import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Card } from "../models/card";

export function GameCell(props) {
    const card: Card = props.card;
    const hasCard = card !== undefined;

    return (
        <View style={styles.container}>
            {hasCard &&
                (
                    <View style={[styles.innerCell, {
                        backgroundColor: card.isOpen ? 'green' : 'green'
                    }]}>
                        {card.isOpen && <Text>
                            {card.faceValue}
                        </Text>}
                    </View>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerCell: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 5
    }
});
