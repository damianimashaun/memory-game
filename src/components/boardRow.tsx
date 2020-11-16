import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../models/card';
import GameCell from './cell';

export default function BoardRow(props) {
    let { data, rowCount } = props;
    const dataCount = data.length;

    if (dataCount < rowCount) {
        const difference = rowCount - dataCount;
        const mod = difference % 2;
        const perSide = difference / 2;
        const toAppend = [];

        if (mod > 0) {
            data = [...data, undefined];
        }

        if (difference > 1) {
            for (let i = 0; i < perSide; i++) {
                toAppend.push(undefined);
            }
        }

        data = [...toAppend, ...data, ...toAppend];
    }

    const renderCell = (card: Card, i: number) => <GameCell key={i} card={card} />;

    return (
        <View style={styles.rowContainer}>
            {data.map((d, i) => renderCell(d, i))}
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
        flexDirection: 'row',
        minHeight: 50
    }
});
