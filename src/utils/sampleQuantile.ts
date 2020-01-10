
export function sampleQuantile(level: number, sample: number[]) {
    const index = sample.length * level;

    const integerIndex = Math.floor(index);

    if (!Number.isInteger(index)) {
        return sample[integerIndex];
    } else {
        return (sample[integerIndex - 1] + sample[integerIndex]) / 2;
    }
}
