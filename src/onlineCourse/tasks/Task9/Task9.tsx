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
import { normStInv } from '../../../utils/normStInv';
import { Fieldset } from 'primereact/fieldset';

interface Task9State {

    sample?: number[];
    distributionType?: DistributionType;
    specificParameters: { [key: string]: string };
}

export class Task9 extends Task<Task9State> {

    state: Task9State = { specificParameters: {} };

    protected checkParameters(): boolean {
        const { sample, distributionType, specificParameters } = this.state;

        let specificParametersCheck: boolean = true;
        switch (distributionType) {
            case DistributionType.BINOMIAL:
                specificParametersCheck = verifyInteger(specificParameters.m) && +specificParameters.m > 0;
                break;

            case DistributionType.GEOMETRIC:
            case DistributionType.POISSON:
            case DistributionType.EXPONENTIAL:
                specificParametersCheck = verifyInteger(specificParameters.k) && +specificParameters.k > 0;
                break;

            case DistributionType.NORMAL:
                specificParametersCheck = verifyInteger(specificParameters.a) && +specificParameters.a > 0;
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

    private onSpecificParameterChange(name: 'm' | 'k' | 'a') {
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

        let paramTitle: string = '';
        let specificParametersOutput: React.ReactNode;
        switch (distributionType) {
            case DistributionType.BINOMIAL:
                specificParametersOutput = (
                    <Fieldset legend="Третье задание:">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <strong>m</strong> =
                            </span>

                            <InputText type="number" value={specificParameters.m ?? ''}
                                       onChange={this.onSpecificParameterChange('m')} />

                            <span className="p-inputgroup-addon">
                                <ValidationIcon valid={verifyInteger(specificParameters.m) && +specificParameters.m > 0} />
                            </span>
                        </div>
                    </Fieldset>
                );
                break;

            case DistributionType.GEOMETRIC:
                paramTitle = 'Количество помидоров';
                break;

            case DistributionType.POISSON:
                paramTitle = 'Доход за каждый звонок';
                break;

            case DistributionType.EXPONENTIAL:
                paramTitle = 'Затраты на секунду звонка';
                break;

            case DistributionType.NORMAL:
                specificParametersOutput = (
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <strong>a</strong> =
                        </span>

                        <InputText type="number" value={specificParameters.a ?? ''}
                                   onChange={this.onSpecificParameterChange('a')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyInteger(specificParameters.a) && +specificParameters.a > 0} />
                        </span>
                    </div>
                );
                break;
        }

        if (paramTitle) {
            specificParametersOutput = (
                <Fieldset legend="Третье задание:">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            {paramTitle}:
                        </span>

                        <InputText type="number" value={specificParameters.k ?? ''}
                                   onChange={this.onSpecificParameterChange('k')} />

                        <span className="p-inputgroup-addon">
                            <ValidationIcon valid={verifyInteger(specificParameters.k) && +specificParameters.k > 0} />
                        </span>
                    </div>
                </Fieldset>
            );
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

    private static renderGeneralPart(start: number, end: number): React.ReactNode {
        return (
            <>
                Левая граница диапазона <strong>&#952;</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(start)} />
                <br />

                Правая граница диапазона <strong>&#952;</strong>:&nbsp;
                <InputText readOnly value={normalizeNumber(end)} />
            </>
        )
    }

    private renderBinomialAnswer(avg: number, quantile: number, sqrtN: number): React.ReactNode {
        const { specificParameters } = this.state;

        const m = +specificParameters.m;
        const c = quantile * Math.sqrt(avg * (1 - avg / m)) / (sqrtN * m);
        const theta = avg / m + c;

        return (
            <>
                {Task9.renderGeneralPart(avg / m - c, theta)}
                <br />

                Среднее количество опаздавших поездов при максимально возможном значении <strong>&#952;</strong>{' '}
                и <strong>m = {m}</strong>:&nbsp;
                <InputText readOnly value={Math.round(theta * m)} />
            </>
        );
    }

    private renderGeometricAnswer(avg: number, quantile: number, sqrtN: number): React.ReactNode {
        const { specificParameters } = this.state;

        const k = +specificParameters.k;
        const c = quantile * Math.sqrt(1 - 1 / avg) / (sqrtN * avg);
        const theta = 1 / avg - c;

        return (
            <>
                {Task9.renderGeneralPart(theta, 1 / avg + c)}
                <br />

                Вероятность, что музыкант убежит, если в него попало ровно <strong>{k}</strong> помидоров:&nbsp;
                <InputText readOnly value={Math.round(10 * theta)} />
            </>
        );
    }

    private renderPoissonAnswer(avg: number, quantile: number, sqrtN: number): React.ReactNode {
        const { specificParameters } = this.state;

        const k = +specificParameters.k;
        const c = quantile * Math.sqrt(avg) / sqrtN;
        const theta = avg + c;

        return (
            <>
                {Task9.renderGeneralPart(avg - c, theta)}
                <br />

                Сумма, которую заработает компания за 5 минут при максимально возможном среднем количестве звонков,
                если за каждый звонок она получает доход в <strong>{k}</strong> рубля:&nbsp;
                <InputText readOnly value={normalizeNumber(k * theta)} />
            </>
        );
    }

    private static renderUniformAnswer(avg: number, quantile: number, sqrtN: number, first: number, last: number) {
        const c = quantile * (last - first) / (Math.sqrt(3) * sqrtN);

        const start = 2 * avg - c - last;
        const end = 2 * avg + c - first;

        return (
            <>
                {Task9.renderGeneralPart(start, end)}
                <br />

                Длина экрана:&nbsp;
                <InputText readOnly value={normalizeNumber(end - start)} />
            </>
        );
    }

    private renderExponentialAnswer(avg: number, quantile: number, sqrtN: number): React.ReactNode {
        const { specificParameters } = this.state;

        const k = +specificParameters.k;
        const c = quantile / (sqrtN * avg);
        const theta = 1 / avg - c;

        return (
            <>
                {Task9.renderGeneralPart(theta, 1 / avg + c)}
                <br />

                Максимальная в среднем сумма, которую может тратить колл-центр на один звонок,
                если за каждую секунду звонка тратит <strong>{k}</strong> копейки:&nbsp;
                <InputText readOnly value={normalizeNumber(k / theta)} />
            </>
        );
    }

    private renderNormalAnswer(sample: number[]): React.ReactNode {
        const { specificParameters } = this.state;

        const a = +specificParameters.a;

        const c = sample.map(x => (x - a) ** 2);
        const start = c.map(x => x / 10279.07).reduce((a, b) => a + b);
        const end = c.map(x => x / 9724.718).reduce((a, b) => a + b);

        return (
            <>
                {Task9.renderGeneralPart(start, end)}
                <br />

                Какое минимальное количество молока можно ожидать потребителю:&nbsp;
                <InputText readOnly value={normalizeNumber(a - Math.sqrt(end))} />
            </>
        );
    }

    protected async renderAnswer() {
        const { sample, distributionType } = this.state;

        if (!sample || !distributionType) {
            return;
        }

        const avg = mean(sample);
        const quantile = normStInv(1 - 0.05 / 2);
        const sqrtN = Math.sqrt(sample.length);

        switch (distributionType) {
            case DistributionType.BINOMIAL:
                return this.renderBinomialAnswer(avg, quantile, sqrtN);

            case DistributionType.GEOMETRIC:
                return this.renderGeometricAnswer(avg, quantile, sqrtN);

            case DistributionType.POISSON:
                return this.renderPoissonAnswer(avg, quantile, sqrtN);

            case DistributionType.UNIFORM:
                return Task9.renderUniformAnswer(avg, quantile, sqrtN, sample[0], sample[sample.length - 1]);

            case DistributionType.EXPONENTIAL:
                return this.renderExponentialAnswer(avg, quantile, sqrtN);

            case DistributionType.NORMAL:
                return this.renderNormalAnswer(sample);
        }
    }
}
