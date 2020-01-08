import { SelectItem } from 'primereact/api';

export enum DistributionType {

    BERNOULLI = 'Бернулли',

    BINOMIAL = 'Биноминальное',

    GEOMETRIC = 'Геометрическое',

    POISSON = 'Пуассона',

    UNIFORM = 'Равномерное',

    EXPONENTIAL = 'Показательное',

    NORMAL = 'Нормальное'
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

export const distributionTypesSelectItems: SelectItem[] = distributionTypes
    .map(type => ({ label: type, value: type }));
