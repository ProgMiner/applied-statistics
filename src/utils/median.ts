
export function median(sample: number[]) {
    return sample.length % 2 === 0
        ? (sample[sample.length / 2 - 1] + sample[sample.length / 2]) / 2
        : sample[(sample.length - 1) / 2];
}
