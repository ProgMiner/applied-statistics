import React from 'react';
import { InputText } from 'primereact/inputtext';
import mean from 'lodash/mean';

import { FinalTask } from '../../components/FinalTask/FinalTask';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { sampleVariance } from '../../../utils/sampleVariance';
import { median } from '../../../utils/median';

interface Task6State {

    sample: string;
}

export class Task6 extends FinalTask<Task6State> {

    private static sampleRegexp = /^( *\()?( *\d+( *,)?)* *\d+? *(\) *)?$/;

    state: Task6State = { sample: '' };

    protected checkParameters(): boolean {
        const { sample } = this.state;

        return Task6.sampleRegexp.test(sample);
    }

    protected renderProblem() {
        const { sample } = this.state;

        return (
            <>
                Дана выборка <strong>{sample.trim() || '?'}</strong>.
            </>
        );
    }

    private onSampleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            sample: e.currentTarget.value
        });
    }

    protected renderFinalParameters() {
        const { sample } = this.state;

        return (
            <>
                <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    Выборка:
                </span>

                    <InputText placeholder="(a, b, c...)" value={sample}
                               onChange={this.onSampleChange.bind(this)} />

                    <span className="p-inputgroup-addon">
                    <ValidationIcon valid={Task6.sampleRegexp.test(sample)} />
                </span>
                </div>
            </>
        );
    }

    protected async renderAnswer() {
        const inputSample = this.state.sample;

        const sample = inputSample.replace(/[()]/g, '').trim()
            .split(/[,\s]+/).map(Number).sort((a, b) => a - b);

        const e = mean(sample);
        const d = sampleVariance(sample, e);
        const m = median(sample);

        return (
            <>
                Найти выборочное среднее: <InputText readOnly value={normalizeNumber(e)} /><br />
                Найти выборочную медиану: <InputText readOnly value={m} />

                <br />
                <br />

                Дисперсия: <InputText readOnly value={normalizeNumber(d)} /><br />
                Среднеквадратическое отклонение: <InputText readOnly value={normalizeNumber(Math.sqrt(d))} />
            </>
        );
    }
}
