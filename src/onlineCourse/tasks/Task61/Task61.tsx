import React from 'react';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../../components/Task/Task';
import { Distribution, DistributionType } from '../../../utils/distribution';
import { InputDistribution } from '../../../components/InputDistribution/InputDistribution';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { verifyNumber } from '../../../utils/verifyNumber';
import { verifyInteger } from '../../../utils/verifyInteger';

import pythonTab from './pythonTab.png';

interface Task61State {

    n: string;
    distribution?: Distribution;
    randomSeed: string;
    count: string;
}

export class Task61 extends Task<Task61State> {

    state: Task61State = { n: '', randomSeed: '', count: '5' };

    private onNChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            n: e.currentTarget.value.trim()
        });
    }

    private onDistributionChange(distribution?: Distribution) {
        this.setState({ ...this.state, distribution });
    }

    private onRandomSeedChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            randomSeed: e.currentTarget.value.trim()
        });
    }

    private onCountChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            count: e.currentTarget.value.trim()
        });
    }

    protected checkParameters(): boolean {
        const { n, distribution, randomSeed, count } = this.state;

        return verifyNumber(n) && distribution !== undefined && verifyNumber(randomSeed) && verifyInteger(count);
    }

    protected renderParameters() {
        const { n, distribution, randomSeed, count } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Объём <strong>n</strong> =
                    </span>

                    <InputText type="number" value={n} onChange={this.onNChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(n)} />
                    </span>
                </div>

                <InputDistribution normalSigmaSquare={false} value={distribution}
                                   onChange={this.onDistributionChange.bind(this)} />

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        <strong>random seed</strong> =
                    </span>

                    <InputText type="number" value={randomSeed} onChange={this.onRandomSeedChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(randomSeed)} />
                    </span>
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        Количество первых и последних элементов:
                    </span>

                    <InputText type="number" value={count} onChange={this.onCountChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyInteger(count)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { n, distribution, randomSeed, count } = this.state;

        if (distribution === undefined) {
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
print(",".join([str(round(sample[i], 2)) for i in range(${count})]))
print(",".join([str(round(sample[${+n - +count} + i], 2)) for i in range(${count})]))
print(sum(sample)/len(sample))
`;

        return (
            <>
                {+count === 3 && (
                    <>
                        <strong>Внимание!</strong>{' '}

                        Убедитесь, что вы открыли в курсе вкладку <strong>Упражнение 6.1 (Python)</strong>,{' '}
                        а не Упражнение 6.1 (<strong>Excel</strong>). Эта вкладка <strong>предпоследняя</strong>{' '}
                        в разделе!
                        <br />

                        <img src={pythonTab} alt="вкладка Python" className="max-width-100" />
                        <hr />
                    </>
                )}

                <div className="margin-bottom">
                    Выполните следущий код в Python-интерпретаторе (например, на сайте <a href="https://repl.it" target="_blank" rel="noopener noreferrer">repl.it</a>):
                </div>

                <code className="margin-bottom">{code.trim()}</code>

                И скопируйте выведенные на экран строки в поля для ответов.
            </>
        );
    }
}
