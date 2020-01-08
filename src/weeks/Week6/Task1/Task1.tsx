import React from 'react';
import { InputText } from 'primereact/inputtext';

import { Distribution, DistributionType } from '../../../utils/distribution';
import { DistributionSelector } from '../../../components/DistributionSelector/DistributionSelector';
import { Task } from '../../../components/Task/Task';

interface Task1State {

    n: string;
    distribution?: Distribution;
    randomSeed: string;
}

export class Task1 extends Task<{}, Task1State> {

    state: Task1State = { n: '', randomSeed: '' };

    private onNChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            n: e.currentTarget.value
        })
    }

    private onDistributionChange(value?: Distribution) {
        this.setState({
            ...this.state,

            distribution: value
        });
    }

    private onRandomSeedChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            randomSeed: e.currentTarget.value
        })
    }

    protected checkParameters(): boolean {
        const { n, distribution, randomSeed } = this.state;

        const numericN = n && +n;
        const numericRandomSeed = randomSeed && +randomSeed;

        return !!(numericN && distribution && numericRandomSeed);
    }

    protected renderParameters() {
        const { n, distribution, randomSeed } = this.state;

        return (
            <>
                Объём (<strong>n</strong> =): <InputText value={n} onChange={this.onNChange.bind(this)} /><br />
                <DistributionSelector normalSigmaSquare={false} value={distribution} onChange={this.onDistributionChange.bind(this)} />
                <strong>random seed</strong> = <InputText value={randomSeed} onChange={this.onRandomSeedChange.bind(this)} />
            </>
        );
    }

    protected async renderAnswer() {
        const { n, distribution, randomSeed } = this.state;

        if (!n || !distribution || !randomSeed) {
            return;
        }

        let code = `
import numpy as np
np.random.seed(${randomSeed})
`;
        switch (distribution.type) {
            case DistributionType.BERNOULLI:
                code += `sample = np.random.binomial(1, ${distribution.params.p}, ${n})`;
                break;

            case DistributionType.BINOMIAL:
                code += `sample = np.random.binomial(${distribution.params.n}, ${distribution.params.p}, ${n})`;
                break;

            case DistributionType.GEOMETRIC:
                code += `sample = np.random.geometric(${distribution.params.p}, ${n})`;
                break;

            case DistributionType.POISSON:
                code += `sample = np.random.poisson(${distribution.params.l}, ${n})`;
                break;

            case DistributionType.UNIFORM:
                code += `sample = np.random.uniform(${distribution.params.a}, ${distribution.params.b}, ${n})`;
                break;

            case DistributionType.EXPONENTIAL:
                code += `sample = np.random.exponential(1 / ${distribution.params.l}, ${n})`;
                break;

            case DistributionType.NORMAL:
                code += `sample = np.random.normal(${distribution.params.a}, ${distribution.params.d}, ${n})`;
                break;
        }

        code += `
print(",".join([str(round(sample[i], 2)) for i in range(5)]))
print(",".join([str(round(sample[${+n - 5} + i], 2)) for i in range(5)]))
print(sum(sample)/len(sample))
`;

        return (
            <>
                Выполните следущий код в Python-интерпретаторе (например, на сайте <a href="https://repl.it" target="_blank" rel="noopener noreferrer">https://repl.it</a>):

                <pre>{code}</pre>

                И скопируйте выведенные на экран строки в поля для ответов.
            </>
        );
    }
}
