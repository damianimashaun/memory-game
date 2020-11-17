import { Card } from '../../../models/card';

function isSquare(i: number) {
    const squareRoot = Math.sqrt(i);
    return Number.isInteger(squareRoot)
        && squareRoot ** 2 === i;
}

function GroupData(dimensions: number[], board: Card[]) {
    if (board.length < 1) {
        return [];
    }

    const columns = dimensions[0];
    const rows = dimensions[1];
    const cellCount = board.length;
    const dataBreaks: Card[][] = [];

    for (let i = 0; i < rows; i++) {
        const start = i * columns;
        const fullEnd = start + columns;
        const end = fullEnd > cellCount
            ? cellCount
            : fullEnd;

        dataBreaks.push(board.slice(start, end));
    }

    return dataBreaks;
}

function DetermineColumnByRow(level: number) {
    const cards = (level + 1) * 2;

    if (isSquare(cards)) {
        const squareRoot = Math.sqrt(cards);
        return [squareRoot, squareRoot];
    }

    let columns = 2;

    if (cards > 12) {
        columns = 4;
    } else if (cards > 6) {
        columns = 3;
    }

    const mod = cards % columns;
    let rows = Math.floor(cards / columns);

    if (mod > 0) {
        rows += 1;
    }

    return [columns, rows];
}

export { GroupData, DetermineColumnByRow };
