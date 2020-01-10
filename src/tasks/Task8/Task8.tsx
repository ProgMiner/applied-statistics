import React from 'react';
import mean from 'lodash/mean';
import { InputText } from 'primereact/inputtext';
import max from 'lodash/max';

import { Task } from '../../components/Task/Task';
import { DistributionType } from '../../utils/distribution';
import { ValidationIcon } from '../../components/ValidationIcon/ValidationIcon';
import { FetchingInputSample } from '../../components/FetchingInputSample/FetchingInputSample';
import { InputDistributionType } from '../../components/InputDistributionType/InputDistributionType';
import { normalizeNumber } from '../../utils/normalizeNumber';
import { verifyInteger } from '../../utils/verifyInteger';
import { verifyNumber } from '../../utils/verifyNumber';
import { factorial } from '../../utils/factorial';

interface Task8State {

    sample?: number[];
    distributionType?: DistributionType;
    specificParameters: { [key: string]: string };
}

export class Task8 extends Task<{}, Task8State> {

    state: Task8State = { specificParameters: {} };

    protected checkParameters(): boolean {
        const { sample, distributionType, specificParameters } = this.state;

        let specificParametersCheck: boolean = true;
        switch (distributionType) {
            case DistributionType.BINOMIAL:
                specificParametersCheck = verifyInteger(specificParameters.m) && +specificParameters.m > 0 &&
                    verifyInteger(specificParameters.k) && +specificParameters.k <= +specificParameters.m;
                break;

            case DistributionType.GEOMETRIC:
                specificParametersCheck = verifyInteger(specificParameters.k) &&
                    +specificParameters.k <= (max(sample) ?? Number.MAX_VALUE);
                break;

            case DistributionType.POISSON:
                break; // TODO

            case DistributionType.UNIFORM:
                specificParametersCheck = verifyNumber(specificParameters.a) && verifyNumber(specificParameters.b);
                break;

            case DistributionType.EXPONENTIAL:
                break; // TODO

            case DistributionType.NORMAL:
                specificParametersCheck = false;
                break;
        }

        return !!sample && !!distributionType && specificParametersCheck;
    }

    private onSampleChange(sample?: number[]) {
        this.setState({...this.state, sample});
    }

    private onDistributionTypeChange(distributionType?: DistributionType) {
        this.setState({ ...this.state, distributionType });
    }

    private onSpecificParameterChange(name: 'a' | 'b' | 'm' | 'k') {
        return (e: React.FormEvent<HTMLInputElement>) => {
            this.setState({
                ...this.state,

                specificParameters: {
                    ...this.state.specificParameters,

                    [name]: e.currentTarget.value.trim()
                }
            });
        }
    }

    protected renderParameters() {
        const { sample, distributionType, specificParameters } = this.state;

        let specificParametersOutput: React.ReactNode;
        switch (distributionType) {
            case DistributionType.BINOMIAL:
                specificParametersOutput = (
                    <>
                        Третье задание:
                        <br />

                        <strong>m</strong> =&nbsp;
                        <InputText value={specificParameters.m ?? ''} onChange={this.onSpecificParameterChange('m')} />
                        <ValidationIcon valid={verifyInteger(specificParameters.m) && +specificParameters.m > 0} />
                        <br />

                        Четвёртое задание:
                        <br />

                        <strong>k</strong> =&nbsp;
                        <InputText value={specificParameters.k ?? ''} onChange={this.onSpecificParameterChange('k')} />
                        <ValidationIcon valid={verifyInteger(specificParameters.k) && +specificParameters.k <= +specificParameters.m} />
                    </>
                );
                break;

            case DistributionType.GEOMETRIC:
                specificParametersOutput = (
                    <>
                        Четвёртое задание:
                        <br />

                        <strong>k</strong> =&nbsp;
                        <InputText value={specificParameters.k ?? ''} onChange={this.onSpecificParameterChange('k')} />
                        <ValidationIcon valid={verifyInteger(specificParameters.k) && +specificParameters.k <= (max(sample) ?? Number.MAX_VALUE)} />
                    </>
                );
                break;

            case DistributionType.POISSON:
                specificParametersOutput = (
                    <>
                        // TODO
                    </>
                );
                break;

            case DistributionType.UNIFORM:
                specificParametersOutput = (
                    <>
                        Четвёртое задание:
                        <br />

                        <strong>a</strong> =&nbsp;
                        <InputText value={specificParameters.a ?? ''} onChange={this.onSpecificParameterChange('a')} />
                        <ValidationIcon valid={verifyNumber(specificParameters.a)} />
                        <br />

                        <strong>b</strong> =&nbsp;
                        <InputText value={specificParameters.b ?? ''} onChange={this.onSpecificParameterChange('b')} />
                        <ValidationIcon valid={verifyNumber(specificParameters.b)} />
                    </>
                );
                break;

            case DistributionType.EXPONENTIAL:
            case DistributionType.NORMAL:
                specificParametersOutput = (
                    <>
                        // TODO
                    </>
                );
                break;
        }

        return (
            <>
                Выборка для задания:&nbsp;
                <FetchingInputSample onChange={this.onSampleChange.bind(this)} />
                <br />

                Распределение:&nbsp;
                <InputDistributionType exclude={[DistributionType.BERNOULLI]} value={distributionType}
                                       onChange={this.onDistributionTypeChange.bind(this)} />
                <br />

                {specificParametersOutput}
            </>
        );
    }

    private renderBinomialAnswer(avg: number, variance: number): React.ReactNode {
        const { specificParameters } = this.state;

        const m = +specificParameters.m;
        const k = +specificParameters.k;

        const theta = avg / m;
        const p = factorial(m) / (factorial(m - k) * factorial(k)) * theta ** k * (1 - theta) ** (m - k);

        return (
            <>
                Оценка метода моментов <strong>&#952;&#770;</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(1 - variance / avg)} />
                <br />

                Оценка метода моментов <strong>m&#770;</strong>:&nbsp;
                <InputText readOnly value={Math.round(avg ** 2 / (avg - variance))} />
                <br />

                Оценка максимального правдоподобия <strong>&#952;&#770;</strong> для&nbsp;
                <strong>m = {m}</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(theta)} />
                <br />

                Вероятность, что завтра опоздает ровно <strong>k = {k}</strong> поездов:&nbsp;
                <InputText readOnly value={normalizeNumber(p)} />
                <br />
            </>
        );
    }

    private renderGeometricAnswer(avg: number, sqAvg: number): React.ReactNode {
        const { specificParameters } = this.state;

        const k = +specificParameters.k;

        const theta = 1 / avg;
        const p = (1 - theta) ** (k - 1) * theta;

        return (
            <>
                Оценка метода моментов <strong>&#952;&#770;<sub>1</sub></strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(theta)} />
                <br />

                Оценка метода моментов <strong>&#952;&#770;<sub>2</sub></strong>:&nbsp;
                <InputText readOnly value={normalizeNumber((-1 + Math.sqrt(1 + 8 * sqAvg)) / (2 * sqAvg))} />
                <br />

                Оценка максимального правдоподобия <strong>&#952;&#770;</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(theta)} />
                <br />

                Вероятность, что музыкант убежит, если в него попало ровно <strong>k = {k}</strong> помидоров:&nbsp;
                <InputText readOnly value={normalizeNumber(p)} />
                <br />
            </>
        );
    }

    private renderUniformAnswer(avg: number, variance: number): React.ReactNode {
        const { sample, specificParameters } = this.state;

        if (!sample) {
            return;
        }

        const sqrt3Variance = Math.sqrt(3 * variance);
        const b = sample[sample.length - 1];
        const a = sample[0];

        return (
            <>
                Оценка метода моментов <strong>&#952;&#770;</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(avg - sqrt3Variance)} />
                <br />

                Оценка метода моментов <strong>b&#770;</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(avg + sqrt3Variance)} />
                <br />

                Оценка максимального правдоподобия <strong>b</strong>:&nbsp;
                <InputText readOnly value={b} />
                <br />

                Вероятность обрушения на участке от&nbsp;
                <strong>a = {specificParameters.a}</strong> до&nbsp;
                <strong>b = {specificParameters.b}</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber((+specificParameters.b - +specificParameters.a) / (b - a))} />
                <br />
            </>
        );
    }

    protected async renderAnswer() {
        const { sample, distributionType } = this.state;

        if (!sample || !distributionType) {
            return;
        }

        const avg = mean(sample);
        const sqAvg = mean(sample.map(x => x ** 2));
        const sampleVariance = sqAvg - avg ** 2;

        switch (distributionType) {
            case DistributionType.BINOMIAL:
                return this.renderBinomialAnswer(avg, sampleVariance);

            case DistributionType.GEOMETRIC:
                return this.renderGeometricAnswer(avg, sqAvg);

            case DistributionType.POISSON:
                return (
                    <>
                        // TODO
                    </>
                );

            case DistributionType.UNIFORM:
                return this.renderUniformAnswer(avg, sampleVariance);

            case DistributionType.EXPONENTIAL:
            case DistributionType.NORMAL:
                return (
                    <>
                        // TODO
                    </>
                );
        }
    }
}
