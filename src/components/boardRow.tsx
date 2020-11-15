import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../models/card';
import { GameCell } from './cell';

export default function BoardRow(props) {
    let { data, rowCount } = props;
    const dataCount = data.length;
    console.log('> Datacount ', dataCount, '<<>>', rowCount, '\n');

    if (dataCount < rowCount) {
        const difference = rowCount - dataCount;
        const mod = difference % 2;
        const perSide = difference / 2;
        const toAppend = [];

        if (mod > 0) {
            data = [...data, undefined];
        }

        for (let i = 0; i < perSide; i++) {
            toAppend.push(undefined);
        }

        data = [...toAppend, ...data, ...toAppend];
    }

    console.log('> ', data, '\n');

    const renderCell = (card: Card) => <GameCell card={card} />;

    const renderCells = () => {
        for (let i = 0; i < rowCount; i++) {
            renderCell(data[i]);
        }
    };

    return (
        <View style={styles.rowContainer}>
            {data.map((d) => renderCell(d))}
            {/* {renderCells()} */}
        </View>
    );
}

// export class BoardRow extends Component {
//     constructor(props) {
//         super(props);
//     }

//     render = () => {
//         return <View style={styles.rowContainer}>

//         </View>;
//     }
// }

const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        minHeight: 100
    }
});
