import React from 'react';
import mean from 'lodash/mean';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../../components/Task/Task';
import { DistributionType } from '../../../utils/distribution';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { FetchingInputSample } from '../../../components/FetchingInputSample/FetchingInputSample';
import { InputDistributionType } from '../../../components/InputDistributionType/InputDistributionType';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { verifyInteger } from '../../../utils/verifyInteger';
import { verifyNumber } from '../../../utils/verifyNumber';
import { factorial } from '../../../utils/factorial';
import { erf } from '../../../utils/erf';
import { Fieldset } from 'primereact/fieldset';

interface Task8State {

    sample?: number[];
    distributionType?: DistributionType;
    specificParameters: { [key: string]: string };
}

export class Task8 extends Task<Task8State> {

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
            case DistributionType.POISSON:
            case DistributionType.EXPONENTIAL:
            case DistributionType.NORMAL:
                specificParametersCheck = verifyInteger(specificParameters.k) && +specificParameters.k > 0;
                break;

            case DistributionType.UNIFORM:
                specificParametersCheck = verifyNumber(specificParameters.a) && verifyNumber(specificParameters.b);
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
        const { distributionType, specificParameters } = this.state;

        let specificParametersOutput: React.ReactNode;
        switch (distributionType) {
            case DistributionType.BINOMIAL:
                specificParametersOutput = (
                    <>
                        <Fieldset legend="Третье задание:" className="half-margin-bottom">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <strong>m</strong> =
                                </span>

                                <InputText type="number" value={specificParameters.m ?? ''}
                                           onChange={this.onSpecificParameterChange('m')} />

                                <span className="p-inputgroup-addon">
                                    <ValidationIcon valid={verifyInteger(specificParameters.m) &&
                                        +specificParameters.m > 0} />
                                </span>
                            </div>
                        </Fieldset>

                        <Fieldset legend="Четвёртое задание:">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <strong>k</strong> =
                                </span>

                                <InputText type="number" value={specificParameters.k ?? ''}
                                           onChange={this.onSpecificParameterChange('k')} />

                                <span className="p-inputgroup-addon">
                                    <ValidationIcon valid={verifyInteger(specificParameters.k) &&
                                        +specificParameters.k <= +specificParameters.m} />
                                </span>
                            </div>
                        </Fieldset>
                    </>
                );
                break;

            case DistributionType.GEOMETRIC:
            case DistributionType.POISSON:
            case DistributionType.EXPONENTIAL:
            case DistributionType.NORMAL:
                specificParametersOutput = (
                    <Fieldset legend="Четвёртое задание:">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <strong>k</strong> =
                            </span>

                            <InputText type="number" value={specificParameters.k ?? ''}
                                       onChange={this.onSpecificParameterChange('k')} />

                            <span className="p-inputgroup-addon">
                                <ValidationIcon valid={verifyInteger(specificParameters.k) &&
                                    +specificParameters.k > 0} />
                            </span>
                        </div>
                    </Fieldset>
                );
                break;

            case DistributionType.UNIFORM:
                specificParametersOutput = (
                        <Fieldset legend="Четвёртое задание:">
                            <div className="p-inputgroup half-margin-bottom">
                                <span className="p-inputgroup-addon">
                                    <strong>a</strong> =
                                </span>

                                <InputText type="number" value={specificParameters.a ?? ''}
                                           onChange={this.onSpecificParameterChange('a')} />

                                <span className="p-inputgroup-addon">
                                    <ValidationIcon valid={verifyNumber(specificParameters.a)} />
                                </span>
                            </div>

                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <strong>b</strong> =
                                </span>

                                <InputText type="number" value={specificParameters.b ?? ''}
                                           onChange={this.onSpecificParameterChange('b')} />

                                <span className="p-inputgroup-addon">
                                    <ValidationIcon valid={verifyNumber(specificParameters.b)} />
                                </span>
                            </div>
                        </Fieldset>
                );
                break;
        }

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Выборка для задания:
                    </span>

                    <FetchingInputSample onChange={this.onSampleChange.bind(this)} />
                </div>

                <div className="p-inputgroup half-margin-bottom-not-last">
                    <span className="p-inputgroup-addon">
                        Распределение:
                    </span>

                    <InputDistributionType exclude={[DistributionType.BERNOULLI]} value={distributionType}
                                           onChange={this.onDistributionTypeChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={!!this.state.distributionType} />
                    </span>
                </div>

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
            </>
        );
    }

    private renderPoissonAnswer(avg: number, sqAvg: number): React.ReactNode {
        const { specificParameters } = this.state;

        const k = +specificParameters.k;
        const p = Math.exp(-avg) * avg ** k / factorial(k);

        return (
            <>
                Оценка метода моментов <strong>&#952;&#770;<sub>1</sub></strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(avg)} />
                <br />

                Оценка метода моментов <strong>&#952;&#770;<sub>2</sub></strong>:&nbsp;
                <InputText readOnly value={normalizeNumber((-1 + Math.sqrt(1 + 4 * sqAvg)) / 2)} />
                <br />

                Оценка максимального правдоподобия <strong>&#952;&#770;</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(avg)} />
                <br />

                Вероятность, что в течение случайных пяти минут поступит <strong>k = {k}</strong> звонков:&nbsp;
                <InputText readOnly value={normalizeNumber(p)} />
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
            </>
        );
    }

    private renderExponentialAnswer(avg: number, sqAvg: number): React.ReactNode {
        const { specificParameters } = this.state;

        const k = +specificParameters.k;

        const theta = 1 / avg;
        const p = 1 - Math.exp(-theta * k);

        return (
            <>
                Оценка метода моментов <strong>&#952;&#770;<sub>1</sub></strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(theta)} />
                <br />

                Оценка метода моментов <strong>&#952;&#770;<sub>2</sub></strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(Math.sqrt(2 / sqAvg))} />
                <br />

                Оценка максимального правдоподобия <strong>&#952;&#770;</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(theta)} />
                <br />

                Вероятность, что при следующем звонке с оператором поговорят меньше <strong>k = {k}</strong> секунд:&nbsp;
                <InputText readOnly value={normalizeNumber(p)} />
            </>
        );
    }

    private renderNormalAnswer(avg: number, variance: number): React.ReactNode {
        const { specificParameters } = this.state;

        const k = +specificParameters.k;
        const p = (1 + erf((k - avg) / Math.sqrt(2 * variance))) / 2;

        return (
            <>
                Оценка метода моментов <strong>&#952;&#770;<sub>1</sub></strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(avg)} />
                <br />

                Оценка метода моментов <strong>&#952;&#770;<sub>2</sub></strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(variance)} />
                <br />

                Оценка максимального правдоподобия <strong>&#952;&#770;</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(avg)} />
                <br />

                Вероятность, что в случайно купленной бутылке молока менее <strong>k = {k}</strong> миллилитров молока:&nbsp;
                <InputText readOnly value={normalizeNumber(p)} />
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
                return this.renderPoissonAnswer(avg, sqAvg);

            case DistributionType.UNIFORM:
                return this.renderUniformAnswer(avg, sampleVariance);

            case DistributionType.EXPONENTIAL:
                return this.renderExponentialAnswer(avg, sqAvg);

            case DistributionType.NORMAL:
                return this.renderNormalAnswer(avg, sampleVariance);
        }
    }
}
