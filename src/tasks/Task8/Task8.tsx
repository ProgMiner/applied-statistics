import React from 'react';
import mean from 'lodash/mean';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../components/Task/Task';
import { DistributionType } from '../../utils/distribution';
import { FetchingInputSample } from '../../components/FetchingInputSample/FetchingInputSample';
import { ValidationIcon } from '../../components/ValidationIcon/ValidationIcon';
import { InputDistributionType } from '../../components/InputDistributionType/InputDistributionType';

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
            case DistributionType.BERNOULLI:
            case DistributionType.BINOMIAL:
            case DistributionType.GEOMETRIC:
            case DistributionType.POISSON:
                specificParametersCheck = false;
                break;

            case DistributionType.UNIFORM:
                specificParametersCheck = !!specificParameters.a && !isNaN(+specificParameters.a) &&
                    !!specificParameters.b && !isNaN(+specificParameters.b);
                break;

            case DistributionType.EXPONENTIAL:
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

    private onSpecificParameterChange(name: 'a' | 'b') {
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
        const { distributionType, specificParameters } = this.state;

        let specificParametersOutput: React.ReactNode;
        switch (distributionType) {
            case DistributionType.BERNOULLI:
            case DistributionType.BINOMIAL:
            case DistributionType.GEOMETRIC:
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
                        <ValidationIcon valid={!!specificParameters.a && !isNaN(+specificParameters.a)} />
                        <br />

                        <strong>b</strong> =&nbsp;
                        <InputText value={specificParameters.b ?? ''} onChange={this.onSpecificParameterChange('b')} />
                        <ValidationIcon valid={!!specificParameters.b && !isNaN(+specificParameters.b)} />
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
                <InputDistributionType value={distributionType} onChange={this.onDistributionTypeChange.bind(this)} />
                <br />

                {specificParametersOutput}
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
                <InputText readOnly value={avg - sqrt3Variance} />
                <br />

                Оценка метода моментов <strong>b&#770;</strong>:&nbsp;
                <InputText readOnly value={avg + sqrt3Variance} />
                <br />

                Оценка максимального правдоподобия <strong>b</strong>:&nbsp;
                <InputText readOnly value={b} />
                <br />

                Оценка метода моментов <strong>b&#770;</strong>:&nbsp;
                <InputText readOnly value={(+specificParameters.b - +specificParameters.a) / (b - a)} />
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
            case DistributionType.BERNOULLI:
            case DistributionType.BINOMIAL:
            case DistributionType.GEOMETRIC:
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
