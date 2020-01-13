import React from 'react';

export enum DistributionType {

    BERNOULLI = 1,
    BINOMIAL,
    GEOMETRIC,
    POISSON,
    UNIFORM,
    EXPONENTIAL,
    NORMAL
}

export interface BernoulliDistribution {

    type: DistributionType.BERNOULLI;
    params: { p: number };
}

export interface BinomialDistribution {

    type: DistributionType.BINOMIAL;
    params: {
        n: number;
        p: number;
    }
}

export interface GeometricDistribution {

    type: DistributionType.GEOMETRIC;
    params: { p: number };
}

export interface PoissonDistribution {

    type: DistributionType.POISSON;
    params: { l: number };
}

export interface UniformDistribution {

    type: DistributionType.UNIFORM;
    params: {
        a: number;
        b: number;
    }
}

export interface ExponentialDistribution {

    type: DistributionType.EXPONENTIAL;
    params: { l: number };
}

export interface NormalDistribution {

    type: DistributionType.NORMAL;
    params: {
        a: number;
        d: number;
    }
}

export type Distribution =
    BernoulliDistribution |
    BinomialDistribution |
    GeometricDistribution |
    PoissonDistribution |
    UniformDistribution |
    ExponentialDistribution |
    NormalDistribution;

export const distributionTypes = [
    DistributionType.BERNOULLI,
    DistributionType.BINOMIAL,
    DistributionType.GEOMETRIC,
    DistributionType.POISSON,
    DistributionType.UNIFORM,
    DistributionType.EXPONENTIAL,
    DistributionType.NORMAL
];

export function renderDistribution(distribution?: Distribution, or: React.ReactNode = undefined): React.ReactNode {
    if (distribution === undefined) {
        return or;
    }

    switch (distribution.type) {
        case DistributionType.BERNOULLI:
            return (
                <>
                    B<sub>{distribution.params.p ?? 'p'}</sub>
                </>
            );

        case DistributionType.BINOMIAL:
            return (
                <>
                    Bin<sub>{distribution.params.n ?? 'n'},{distribution.params.p ?? 'p'}</sub>
                </>
            );

        case DistributionType.GEOMETRIC:
            return (
                <>
                    G<sub>{distribution.params.p ?? 'p'}</sub>
                </>
            );

        case DistributionType.POISSON:
            return (
                <>
                    &#928;<sub>{distribution.params.l ?? '\u03bb'}</sub>
                </>
            );

        case DistributionType.UNIFORM:
            return (
                <>
                    U<sub>{distribution.params.a ?? 'a'},{distribution.params.b ?? 'b'}</sub>
                </>
            );

        case DistributionType.EXPONENTIAL:
            return (
                <>
                    Exp<sub>{distribution.params.l ?? '\u03bb'}</sub>
                </>
            );

        case DistributionType.NORMAL:
            return (
                <>
                    N<sub>{distribution.params.a ?? 'a'},{distribution.params.d ?? (<>&#963;<sup>2</sup></>)}</sub>
                </>
            );
    }
}

export function calcVariance(distribution: Distribution): number {
    switch (distribution.type) {
        case DistributionType.BERNOULLI:
            return distribution.params.p * (1 - distribution.params.p);

        case DistributionType.BINOMIAL:
            return distribution.params.n * distribution.params.p * (1 - distribution.params.p);

        case DistributionType.GEOMETRIC:
            return (1 - distribution.params.p) / distribution.params.p ** 2;

        case DistributionType.POISSON:
            return distribution.params.l;

        case DistributionType.UNIFORM:
            return (distribution.params.b - distribution.params.a) ** 2 / 12;

        case DistributionType.EXPONENTIAL:
            return 1 / distribution.params.l ** 2;

        case DistributionType.NORMAL:
            return distribution.params.d;
    }
}
