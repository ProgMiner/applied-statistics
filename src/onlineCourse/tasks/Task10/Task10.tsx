import React from 'react';
import mean from 'lodash/mean';
import { InputText } from 'primereact/inputtext';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { FetchingInputSample } from '../../../components/FetchingInputSample/FetchingInputSample';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { verifyInteger } from '../../../utils/verifyInteger';
import { verifyNumber } from '../../../utils/verifyNumber';
import { normStInv } from '../../../utils/normStInv';

interface Task10State {

    sample?: number[];
    m: string;
    e: string;
}

export class Task10 extends Task<Task10State> {

    state: Task10State = { m: '', e: '' };

    protected checkParameters(): boolean {
        const { sample, m, e } = this.state;

        return !!sample && verifyInteger(m) && verifyNumber(e);
    }

    private onSampleChange(sample?: number[]) {
        this.setState({...this.state, sample});
    }

    private onMChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            m: e.currentTarget.value
        });
    }

    private onEChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            e: e.currentTarget.value
        });
    }

    protected renderParameters() {
        const { m, e } = this.state;

        return (
            <>
                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Выборка для задания:
                    </span>

                    <FetchingInputSample onChange={this.onSampleChange.bind(this)} />
                </div>

                <div className="p-inputgroup half-margin-bottom">
                    <span className="p-inputgroup-addon">
                        Вес одного эскимо:
                    </span>

                    <InputText type="number" value={m} onChange={this.onMChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyInteger(m)} />
                    </span>
                </div>

                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <strong>&#949;</strong> =
                    </span>

                    <InputText type="number" value={e} onChange={this.onEChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                        <ValidationIcon valid={verifyNumber(e)} />
                    </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const { sample, m, e } = this.state;

        if (!sample) {
            return;
        }

        const avg = mean(sample);
        const sqAvg = mean(sample.map(x => x ** 2));
        const sampleVariance = sqAvg - avg ** 2;
        const deviation = Math.sqrt(sample.length / (sample.length - 1) * sampleVariance);
        const absDeviationFunc = Math.abs(Math.sqrt(sample.length) * (avg - +m) / deviation);
        const hypothesis = absDeviationFunc < normStInv(1 - +e / 2);

        return (
            <>
                Выборочное среднее:&nbsp;
                <InputText readOnly value={normalizeNumber(avg)} />
                <br />

                Оценка среднеквадратического отклонения:&nbsp;
                <InputText readOnly value={normalizeNumber(deviation)} />
                <br />

                Значение модуля функции отклонения:&nbsp;
                <InputText readOnly value={normalizeNumber(absDeviationFunc)} />
                <br />

                Ответ:&nbsp;
                <InputText readOnly value={hypothesis ? 1 : 0} />
            </>
        );
    }
}
