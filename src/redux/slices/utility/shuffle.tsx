function makeArray(max: number) {
    const array = [];

    for (let i = 0; i <= max; i++) {
        array.push(i, i);
    }

    return array;
}

// Using Fisher-Yates
function GetShuffledArray(max: number) {
    const array = makeArray(max);
    for (let i = array.length - 1; i > 0; i--) {
        // random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export default GetShuffledArray;
