import mean from 'lodash/mean';

export function sampleVariance(sample: number[], expected?: number) {
    const e = expected ? expected : mean(sample);

    return mean(sample.map(v => (v - e) ** 2));
}
