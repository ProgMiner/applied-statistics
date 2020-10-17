import React from 'react';
import { InputText } from 'primereact/inputtext';
import maxBy from 'lodash/maxBy';
import mean from 'lodash/mean';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { sampleVariance } from '../../../utils/sampleVariance';
import { normalizeNumber } from '../../../utils/normalizeNumber';
import { median } from '../../../utils/median';

interface Task621State {

    alchemists: string;
}

interface CountObject {

    value: number;
    count: number;
}

export class Task621 extends Task<Task621State> {

    private static alchemistsRegexp = /^( *\()?( *\d+( *,)?)* *\d+? *(\) *)?$/;

    state: Task621State = { alchemists: '' };

    private onAlchemistsChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            alchemists: e.currentTarget.value
        });
    }

    protected checkParameters(): boolean {
        return Task621.alchemistsRegexp.test(this.state.alchemists);
    }

    protected renderParameters() {
        const { alchemists } = this.state;

        return (
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    Выборка:
                </span>

                <InputText placeholder="(a, b, c...)" value={alchemists}
                           onChange={this.onAlchemistsChange.bind(this)} />

                <span className="p-inputgroup-addon">
                    <ValidationIcon valid={Task621.alchemistsRegexp.test(alchemists)} />
                </span>
            </div>
        );
    }

    protected async renderAnswer() {
        const { alchemists } = this.state;

        if (!alchemists) {
            return;
        }

        const sample = alchemists.replace(/[()]/g, '').trim()
            .split(/[,\s]+/).map(Number).sort((a, b) => a - b);

        const counts: CountObject[] = [1, 2, 3, 4, 5, 6]
            .map(i => ({value: i, count: sample.filter(v => v === i).length}));

        const e = mean(sample);
        const d = sampleVariance(sample, e);
        const m = median(sample);

        const maxCount = maxBy(counts, v => v.count)?.count;
        const mode = counts.filter(v => v.count === maxCount)
            .map(v => v.value).sort((a, b) => a - b)[0];

        return (
            <>
                <table>
                    <tbody>
                    {[(v: CountObject) => v.value < 4, (v: CountObject) => v.value > 3].map(f => (
                        <tr key={String(f)}>
                            {counts.filter(f).map(v => (
                                <td key={v.value}>
                                    <strong>P(&#958;<sup>*</sup> = {v.value})</strong> ={' '}
                                    <InputText readOnly value={v.count === 0 ? '0' : `${v.count} / ${sample.length}`} />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>

                Математическое ожидание: <InputText readOnly value={normalizeNumber(e)} /><br />
                Дисперсия: <InputText readOnly value={normalizeNumber(d)} /><br />
                Среднеквадратическое отклонение: <InputText readOnly value={normalizeNumber(Math.sqrt(d))} /><br />
                Медиана: <InputText readOnly value={m} /><br />
                Мода: <InputText readOnly value={mode} /><br />
            </>
        );
    }
}
