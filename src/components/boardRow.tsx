import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Card } from '../models/card';
import PadItemArray from '../redux/slices/utility/arrayPad';
import GameCell from './cell';

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 50
    }
});

function BoardRow({ data, columnCount }) {
    const dataCount = data.length;
    const renderCell = (card: Card, i: number) => <GameCell key={i} card={card} />;
    let displayData;

    if (dataCount < columnCount) {
        displayData = PadItemArray(data, columnCount);
    } else {
        displayData = data;
    }

    return (
        <View style={styles.rowContainer}>
            {displayData.map((card: Card, i: number) => renderCell(card, i))}
        </View>
    );
}

BoardRow.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    columnCount: PropTypes.number.isRequired
};

export default BoardRow;
