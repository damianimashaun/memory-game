export default function PadItemArray(data: [], columns: number) {
    const dataCount = data.length;
    const difference = columns - dataCount;
    const mod = difference % 2;
    const perSide = difference / 2;
    const toAppend = [];

    if (difference > 1) {
        for (let i = 0; i < perSide; i++) {
            toAppend.push(undefined);
        }
    }

    const result = [...toAppend, ...data, ...toAppend];

    if (mod > 0) {
        return [...result, undefined];
    }

    return result;
}
