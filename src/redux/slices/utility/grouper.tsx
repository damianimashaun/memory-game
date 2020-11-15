function isSquare(i: number) {
    const squareRoot = Math.sqrt(i);
    return Number.isInteger(squareRoot) && squareRoot * squareRoot === i;
}

export default function determineColumnByRow(level: number) {
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
