import React from 'react';
import mean from 'lodash/mean';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../../components/Task/Task';
import { calcVariance, Distribution, DistributionType } from '../../../utils/distribution';
import { InputDistribution } from '../../../components/InputDistribution/InputDistribution';
import { FetchingInputSample } from '../../../components/FetchingInputSample/FetchingInputSample';
import { sampleVariance } from '../../../utils/sampleVariance';
import { normalizeNumber } from '../../../utils/normalizeNumber';

interface Task622State {

    sample10?: number[];
    sample10000?: number[];
    distribution?: Distribution;
}

export class Task622 extends Task<Task622State> {

    state: Task622State = {};

    private onSample10Change(sample10?: number[]) {
        this.setState({...this.state, sample10});
    }

    private onSample10000Change(sample10000?: number[]) {
        this.setState({...this.state, sample10000});
    }

    private onDistributionChange(value?: Distribution) {
        this.setState({
            ...this.state,

            distribution: value
        });
    }

    protected checkParameters(): boolean {
        const { sample10, sample10000, distribution } = this.state;

        return !!sample10 && !!sample10000 && !!distribution;
    }

    protected renderParameters() {
        const { distribution } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Выборка объёма <strong>n = 10</strong>:
                    </span>

                    <FetchingInputSample onChange={this.onSample10Change.bind(this)} />
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Выборка объёма <strong>n = 10000</strong>:
                    </span>

                    <FetchingInputSample onChange={this.onSample10000Change.bind(this)} />
                </div>

                <InputDistribution value={distribution} onChange={this.onDistributionChange.bind(this)} />
            </>
        );
    }

    private static output(property: string, v: number, p: number, trueP: number, d: number, trueD: number): React.ReactNode {
        return (
            <>
                Для выборки объёма <strong>{v}</strong>:<br />
                Оценка <strong>{property}</strong>: <InputText readOnly value={normalizeNumber(p)} /><br />
                Погрешность оценки: <InputText readOnly value={normalizeNumber(Math.abs(p - trueP))} /><br />
                Оценка дисперсии: <InputText readOnly value={normalizeNumber(d)} /><br />
                Погрешность оценки дисперсии: <InputText readOnly value={normalizeNumber(Math.abs(d - trueD))} />
            </>
        )
    }

    protected async renderAnswer() {
        const { sample10, sample10000, distribution } = this.state;

        if (!sample10 || !sample10000 || !distribution) {
            return;
        }

        const e10 = mean(sample10);
        const e10000 = mean(sample10000);
        const d10 = sampleVariance(sample10, e10);
        const d10000 = sampleVariance(sample10000, e10000);

        const variance = calcVariance(distribution);
        let output: (v: number, e: number, d: number) => React.ReactNode;
        switch (distribution.type) {
            case DistributionType.BERNOULLI:
                output = (v, e, d) => Task622.output(
                    'p',
                    v,
                    e,
                    distribution.params.p,
                    d,
                    variance
                );
                break;

            case DistributionType.BINOMIAL:
                output = (v, e, d) => Task622.output(
                    'p',
                    v,
                    e / distribution.params.n,
                    distribution.params.p,
                    d,
                    variance
                );
                break;

            case DistributionType.GEOMETRIC:
                output = (v, e, d) => Task622.output(
                    'p',
                    v,
                    1 / e,
                    distribution.params.p,
                    d,
                    variance
                );
                break;

            case DistributionType.POISSON:
                output = (v, e, d) => Task622.output(
                    '\u03BB',
                    v,
                    e,
                    distribution.params.l,
                    d,
                    variance
                );
                break;

            case DistributionType.UNIFORM:
                output = (v, e, d) => Task622.output(
                    'a',
                    v,
                    2 * e - distribution.params.b,
                    distribution.params.a,
                    d,
                    variance
                );
                break;

            case DistributionType.EXPONENTIAL:
                output = (v, e, d) => Task622.output(
                    '\u03BB',
                    v,
                    1 / e,
                    distribution.params.l,
                    d,
                    variance
                );
                break;

            case DistributionType.NORMAL:
                output = (v, e, d) => Task622.output(
                    'a',
                    v,
                    e,
                    distribution.params.a,
                    d,
                    variance
                );
                break;
        }

        return (
            <>
                {output(10, e10, d10)}

                <hr />

                {output(10000, e10000, d10000)}
            </>
        );
    }
}
