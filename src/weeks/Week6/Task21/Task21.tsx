import React from 'react';
import { InputText } from 'primereact/inputtext';
import maxBy from 'lodash/maxBy';
import mean from 'lodash/mean';

import { Task } from '../../../components/Task/Task';
import { ValidationIcon } from '../../../components/ValidationIcon/ValidationIcon';
import { variance } from '../../../utils/dispersion';

interface Task21State {

    alchemists: string;
}

interface CountObject {

    value: number;
    count: number;
}

export class Task21 extends Task<{}, Task21State> {

    private alchemistsRegexp = /^( *\()?( *\d+( *,)?)* *\d+? *(\) *)?$/;

    state: Task21State = { alchemists: '' };

    private onAlchemistsChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,

            alchemists: e.currentTarget.value
        })
    }

    protected checkParameters(): boolean {
        return this.alchemistsRegexp.test(this.state.alchemists);
    }

    protected renderParameters() {
        const { alchemists } = this.state;

        return (
            <>
                Выборка: <InputText placeholder="(a, b, c...)" value={alchemists}
                                    onChange={this.onAlchemistsChange.bind(this)} />
                <ValidationIcon valid={this.alchemistsRegexp.test(alchemists)} />
            </>
        );
    }

    protected async renderAnswer() {
        const { alchemists } = this.state;

        if (!alchemists) {
            return;
        }

        const sample = alchemists.replace(/[()]/g, '').trim()
            .replace(/,/g, ' ').replace(/ +/g, ' ')
            .split(' ').map(v => Number(v.trim())).sort((a, b) => a - b);

        const counts: Array<CountObject> = [1, 2, 3, 4, 5, 6]
            .map(i => ({value: i, count: sample.filter(v => v === i).length}));

        const e = mean(sample);
        const d = variance(sample, e);
        const m = sample.length % 2 === 0
            ? (sample[sample.length / 2] + sample[sample.length / 2]) / 2
            : sample[(sample.length + 1) / 2];

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
                                    P(&#958;<sup>*</sup> = {v.value}) =
                                    <InputText readOnly value={v.count === 0 ? '0' : `${v.count} / ${sample.length}`} />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>

                Математическое ожидание: <InputText readOnly value={e} /><br />
                Дисперсия: <InputText readOnly value={d} /><br />
                Среднеквадратическое отклонение: <InputText readOnly value={Math.sqrt(d)} /><br />
                Медиана: <InputText readOnly value={m} /><br />
                Мода: <InputText readOnly value={mode} /><br />
            </>
        );
    }
}
