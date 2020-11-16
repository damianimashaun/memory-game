export default function formatTime(ms: number) {
    if (ms < 100) {
        return '0:00';
    }

    let seconds = Math.floor(ms / 100);
    const mins = Math.floor(seconds / 60);
    seconds -= (60 * mins);
    const secondsPart = seconds < 10 ? `0${seconds}` : seconds;
    return `${mins}:${secondsPart}`;
}
