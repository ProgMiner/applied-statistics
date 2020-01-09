export function quantile(level: number, sample: number[]) {
    const index = sample.length * level;

    const roundedIndex = Math.floor(index);

    if (index !== roundedIndex) {
        return sample[Math.floor(index)];
    } else {
        return (sample[roundedIndex - 1] + sample[roundedIndex]) / 2;
    }
}
